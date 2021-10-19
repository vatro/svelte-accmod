import { Node } from 'estree';
import { Scope } from 'periscopic';
import Component from '../../Component';
import Renderer from '../../render_dom/Renderer';
import get_for_accmod from './get_for_accmod';

// ### Goes through all references / declarations used to construct the head of the current 'MemberExpression' in order to find
// its 'origin' (top-level / main execution context reference) incl. all other chain-members.
export default function get_reref_chain_members(declaration_node: Node, scope: Scope, component: Component, node: Node, renderer: Renderer) {
	// all chain-members as 'keys' -> needed for creation of the corresponding '$cty_config'-entry
	const all_keys = [];

	// all computed chain members (ccms) -> used together with 'all_keys'
	// -> needed for 'accmod'-invalidation / creation of the corresponding '$cty_config'-entry
	let all_ccms = undefined;

	// the 'name' of the 'origin' variable declared at top-level / main execution context
	// -> needed for 'accmod'-invalidation (as 'head') and for creation of the corresponding '$cty_config'-entry
	let origin_var_name = undefined;

	function get_left_members_first(left) {
		const for_accmod = get_for_accmod(left, renderer);
		const cty_chain_keys = for_accmod.keys;
		const ccms = for_accmod.computed_members;

		all_keys.unshift(...cty_chain_keys);
		ccms && !all_ccms ? all_ccms = [] : null;
		ccms ? all_ccms = all_ccms.concat(ccms) : null;
	}

	function get_right_members(decl_node) {
		const for_accmod = get_for_accmod(decl_node.init, renderer);
		const cty_chain_keys = for_accmod.keys;
		const ccms = for_accmod.computed_members;

		cty_chain_keys.length ? all_keys.unshift(...cty_chain_keys) : null;
		ccms && !all_ccms ? all_ccms = [] : null;
		ccms ? all_ccms = all_ccms.concat(ccms) : null;
	}

	function get_name_to_search(current_decl_node) {

		switch (current_decl_node.init.type) {
			case 'MemberExpression':
				return current_decl_node.init.object.name;

			case 'Identifier':
				return current_decl_node.init.name;
		
			case 'ObjectExpression':
				if (current_decl_node.init.properties[0].type === 'SpreadElement') {
					return current_decl_node.init.properties[0].argument.name;
				}
				break;

			case 'ArrayExpression':
				if (current_decl_node.init.elements.length) {
					if (current_decl_node.init.elements[0].type === 'SpreadElement') {
						return current_decl_node.init.elements[0].argument.name;
					}
				} else {
					return current_decl_node.init.id.name;
				}
				
				break;
			default:
				return undefined;

		}
	}

	function process_decl_node(current_decl_node, decl_scope) {

		let higher_decl_found: {node:Node, scope: Scope} = undefined;
		let higher_decl_node: Node = undefined;
		let higher_decl_scope: Scope = undefined;

		if (current_decl_node.init.type === 'MemberExpression') get_right_members(current_decl_node);
		const name_to_search = get_name_to_search(current_decl_node);

		// check for main context reference first, if true, skip the rest of the check.
		if (is_in_main_context(name_to_search)) {
			// SEARCH END!
			origin_var_name = name_to_search;
			return;
		}
		
		// Find higher declaration (node)
		// e.g. find declaration of 'foo' with current declaration being something like `const baz = foo.bar[...]`
		higher_decl_found = find_higher_declaration(name_to_search, decl_scope);
		higher_decl_node = higher_decl_found.node;
		higher_decl_scope = higher_decl_found.scope;

		// Prcoessing the higher declaration node we've found above ...
		if (higher_decl_node && higher_decl_node['declarations'] && origin_var_name === undefined) {

			for (let i = 0; i < higher_decl_node['declarations'].length; i++) {

				const h_dcl = higher_decl_node['declarations'][i];

				if (h_dcl.type === 'VariableDeclarator') {

					const h_dcl_init = h_dcl.init;

					// if simple rereference like e.g. `const c = some_long_top_level_ref_id_like_to_shorten_locally`
					// declaration was initialized
					if (h_dcl_init) {
						if (h_dcl_init.type === 'Identifier') {
							const name_to_search = h_dcl_init.name;
							if (!is_in_main_context(name_to_search)) {
								// SEARCH DEEPER!
								process_decl_node(h_dcl, higher_decl_scope);
							} else {
								origin_var_name = name_to_search;
								return;
							}
						} else if (
							h_dcl_init.type === 'MemberExpression' ||
							h_dcl_init.type === 'ObjectExpression' ||
							h_dcl_init.type === 'ArrayExpression') {
							// SEARCH DEEPER!
							process_decl_node(h_dcl, higher_decl_scope);
						}
					} else {
						// uninitialized declaration
						const name_to_search = h_dcl.id.name;
						if (is_in_main_context(name_to_search)) {
							// SHOULD BE!
							// SEARCH END!
							origin_var_name = name_to_search;
							return;
						} else {
							// SHOULD NEVER HAPPEN ?!
							throw new Error('Error while searching higher declaration: uninitialized declaration should be in main context!');
						}
					}
				}
			}
		}

		function find_higher_declaration(name, decl_scope) {
			let found_higher_decl_node: Node = undefined;
			let current_scope: Scope = undefined;

			function search_scopes(name, scope: Scope) {
				current_scope = scope;

				found_higher_decl_node = current_scope.declarations.get(name);

				if (found_higher_decl_node) {

					// SEARCH END!
					return;

				} else if (current_scope.parent) {
					const parent_scope = current_scope.parent;

					if (parent_scope instanceof Scope) {

						if (parent_scope.declarations && parent_scope.declarations.size) {

							found_higher_decl_node = parent_scope.declarations.get(name);

							if (!found_higher_decl_node) {
								// SEARCH HIGHER!
								search_scopes(name, parent_scope);
							} else {
								// SEARCH END!
								return;
							}

						} else {
							// SEARCH HIGHER!
							search_scopes(name, parent_scope);
						}

					} else {
						// PARENT IS NOT SCOPE!
						throw new Error('Error while searching higher declaration: parent_scope is not a Scope instance!');
					}

				// scope has no parent -> declaration should be be in main context
				} else {
					// SEARCH END!
					found_higher_decl_node = undefined;
					origin_var_name = name;
					return;
				}
			}


			search_scopes(name, decl_scope);
			return {node: found_higher_decl_node, scope: current_scope};
		}


		function is_in_main_context(name) {
			const main_context_var = component.var_lookup.get(name);
			return main_context_var;
		}
	}

	get_left_members_first(node['left']);
	process_decl_node(declaration_node, scope);

	return { origin_var_name, all_keys, all_ccms };
}
