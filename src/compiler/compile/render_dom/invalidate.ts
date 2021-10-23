import { nodes_match } from '../../utils/nodes_match';
import { Scope } from 'periscopic';
import { x } from 'code-red';
import { Node, Expression } from 'estree';
import Renderer from './Renderer';
import { Var } from '../../interfaces';
import get_reref_chain_members from '../utils/accmod/get_reref_chain_members';
import get_for_accmod from '../utils/accmod/get_for_accmod';

export function invalidate(renderer: Renderer, scope: Scope, node: Node, names: Set<string>, main_execution_context: boolean = false) {
	const { component } = renderer;

	const [head, ...tail] = Array.from(names)
		.filter(name => {
			const owner = scope.find_owner(name);
			return !owner || owner === component.instance_scope;
		})
		.map(name => component.var_lookup.get(name))
		.filter(variable =>	{
			return variable && (
				!variable.hoistable &&
				!variable.global &&
				!variable.module &&
				(
					variable.referenced ||
					variable.subscribable ||
					variable.is_reactive_dependency ||
					variable.export_name ||
					variable.name[0] === '$'
				)
			);
		}) as Var[];

	function get_invalidated(variable: Var, node?: Expression) {
		if (main_execution_context && !variable.subscribable && variable.name[0] !== '$') {
			return node;
		}
		return renderer_invalidate(renderer, variable.name, undefined, main_execution_context);
	}

	// ### EXIT --> no head
	if (!head) {

		// ### MODIFICATION -> if 'head' is NOT available! (happens e.g. with 'MemberExpression's having a locally declared var as 'head' -> rereferencing)
		// The logic below will go through all references used to define the 'head' of the current 'MembersExpression' until it finds
		// its 'origin' (top-level / main execution context reference) which will - if any - then be used in 'cty' / '$cty_config' (along with all other chain-members found),
		// in order to perform correct updating.
		if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression') {

			const exp_head = Array.from(names)[0]; //  TODO : when do we get multiple names here?!
			const exp_head_decl_node: Node = scope.declarations.get(exp_head);

			// REMARK: without the `exp_head_decl_node['declarations']` check the 'store-imports-hoisted' test will fail.
			if (exp_head_decl_node && exp_head_decl_node['declarations']) {
				for (let i = 0; i < exp_head_decl_node['declarations'].length; i++) {

					const exp_head_decl = exp_head_decl_node['declarations'][i];

					if (exp_head_decl.type === 'VariableDeclarator') {

						const reref_result = get_reref_chain_members(exp_head_decl, scope, component, node, renderer);
						if (reref_result.origin_var_name) {
							const head_index = renderer.context_lookup.get(reref_result.origin_var_name).index;

							// add MemberExpression keys chain (members) to `cty` and get the index of the chain,
							// identical chains will have the same `cty_index`
							const cty_index = renderer.add_to_cty(`${node.left['start']}`, head_index.value, reref_result.all_keys).members_cty_i;

							const extra_args = [];

							// extra_args[1]: `cty_index`
							extra_args.unshift({
								type: 'Literal',
								value: cty_index
							});

							// extra_args[0]: `head`
							extra_args.unshift({
								type: 'Identifier',
								name: reref_result.origin_var_name
							});

							if (!reref_result.all_ccms) {
								return x`$$invalidate(${head_index}, () => ${node}, ${extra_args})`;
							} else {
								return x`$$invalidate(${head_index}, () => ${node}, ${extra_args}, ${reref_result.all_ccms})`;
							}
						}
					}
				}
			}

			// ### ORIGINAL
			return node;

		} else {
			// ### ORIGINAL
			return node;
		}
	}

	component.has_reactive_assignments = true;

	// ### EXIT --> self reassignment a = a
	if (node.type === 'AssignmentExpression' && node.operator === '=' && nodes_match(node.left, node.right) && tail.length === 0) {
		return get_invalidated(head, node);
	}

	// ### check if it's a store value syntax 
	const is_store_value = head.name[0] === '$' && head.name[1] !== '$';

	// ### at this point: tail available only in destructuring cases (`[d, e] = [e, d]`)
	const extra_args = tail.map(variable => get_invalidated(variable)).filter(Boolean);

	// ### EXIT --> store value assignment
	if (is_store_value) {
		return x`@set_store_value(${head.name.slice(1)}, ${node}, ${head.name}, ${extra_args})`;
	}

	let invalidate;

	if (!main_execution_context) {
		const pass_value = (
			// ### handles destructuring
			extra_args.length > 0 ||

			// ### handles `foo = value`
			(node.type === 'AssignmentExpression' && node.left.type !== 'Identifier') ||
			(node.type === 'UpdateExpression' && (!node.prefix || node.argument.type !== 'Identifier'))
		);

		// ### indicates if the `${node}` should be wrapped in an arrow function inside `$$invalidate(..)`.
		// wrapping the `${node}` in an arrow function prevents immediate accessor-setter-statement execution on `$$invalidate(...)` call.
		let wrapNode = false;
		let ccms = undefined;

		// ### MODIFICATION -> if 'head' is available!
		if (pass_value) {

			// ### handles 'standard' and 'deep' accessor assignments
			if (node.type === 'AssignmentExpression' && node.left.type === 'MemberExpression') {
				if (node.left.type === 'MemberExpression') {

					const for_accmod = get_for_accmod(node.left, renderer);
					const cty_chain_keys = for_accmod.keys;
					ccms = for_accmod.computed_members;

					// don't wrap `${node}` if there are no expression keys left (after filtering out the ones named '_index')
					if (cty_chain_keys?.length) {
						const head_index = renderer.context_lookup.get(head.name).index.value;

						// add MemberExpression keys chain (members) to `cty` and get the index of the chain,
						// identical chains will have the same `cty_index`
						const cty_index = renderer.add_to_cty(`${node.left['start']}`, head_index, cty_chain_keys).members_cty_i;

						// extra_args[1]: `cty_index`
						extra_args.unshift({
							type: 'Literal',
							value: cty_index
						});

						// extra_args[0]: `head`
						extra_args.unshift({
							type: 'Identifier',
							name: head.name
						});

						wrapNode = true;
					} else {
						// ### ORIGINAL behavior
						// extra_args[0]: `head`
						extra_args.unshift({
							type: 'Identifier',
							name: head.name
						});

						// don't wrap `${node}`: no expression keys
						wrapNode = false;
					}
				}
			} else {
				// ### ORIGINAL behavior
				// extra_args[0]: `head`
				extra_args.unshift({
					type: 'Identifier',
					name: head.name
				});

				// don't wrap `${node}`: not Assignment- && MemberExpression
				wrapNode = false;
			}
		}

		if (wrapNode) {
			// ### Wrapping `${node}` in an arrow function prevents immediate accessors-assigment execution on `$$invalidate(...)` call.
			if (!ccms) {
				invalidate = x`$$invalidate(${renderer.context_lookup.get(head.name).index}, () => ${node}, ${extra_args})`;
			} else {
				invalidate = x`$$invalidate(${renderer.context_lookup.get(head.name).index}, () => ${node}, ${extra_args}, ${ccms})`;
			}

		} else {
			// ### ORIGINAL
			invalidate = x`$$invalidate(${renderer.context_lookup.get(head.name).index}, ${node}, ${extra_args})`;
		}

	} else {
		// skip `$$invalidate` if it is in the main execution context
		invalidate = extra_args.length ? [node, ...extra_args] : node;
	}

	if (head.subscribable && head.reassigned) {
		const subscribe = `$$subscribe_${head.name}`;
		invalidate = x`${subscribe}(${invalidate})`;
	}

	return invalidate;
}

export function renderer_invalidate(renderer: Renderer, name: string, value?, main_execution_context: boolean = false) {
	const variable = renderer.component.var_lookup.get(name);

	if (variable && (variable.subscribable && (variable.reassigned || variable.export_name))) {
		if (main_execution_context) {
			return x`${`$$subscribe_${name}`}(${value || name})`;
		} else {
			const member = renderer.context_lookup.get(name);
			return x`${`$$subscribe_${name}`}($$invalidate(${member.index}, ${value || name}))`;
		}
	}

	if (name[0] === '$' && name[1] !== '$') {
		return x`${name.slice(1)}.set(${value || name})`;
	}

	if (
		variable && (
			variable.module || (
				!variable.referenced &&
				!variable.is_reactive_dependency &&
				!variable.export_name &&
				!name.startsWith('$$')
			)
		)
	) {
		return value || name;
	}

	if (value) {
		if (main_execution_context) {
			return x`${value}`;
		} else {
			const member = renderer.context_lookup.get(name);
			return x`$$invalidate(${member.index}, ${value})`;
		}
	}

	if (main_execution_context) return;

	// if this is a reactive declaration, invalidate dependencies recursively
	const deps = new Set([name]);

	deps.forEach(name => {
		const reactive_declarations = renderer.component.reactive_declarations.filter(x =>
			x.assignees.has(name)
		);
		reactive_declarations.forEach(declaration => {
			declaration.dependencies.forEach(name => {
				deps.add(name);
			});
		});
	});

	// TODO ideally globals etc wouldn't be here in the first place
	const filtered = Array.from(deps).filter(n => renderer.context_lookup.has(n));
	if (!filtered.length) return null;

	return filtered
		.map(n => x`$$invalidate(${renderer.context_lookup.get(n).index}, ${n})`)
		.reduce((lhs, rhs) => x`${lhs}, ${rhs}`);
}
