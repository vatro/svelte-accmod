import { add_render_callback, flush, schedule_update, dirty_components } from './scheduler';
import { current_component, set_current_component } from './lifecycle';
import { blank_object, is_empty, is_function, run, run_all, noop } from './utils';
import { children, detach, start_hydrating, end_hydrating } from './dom';
import { transition_in } from './transitions';
import { SvelteComponentDev } from 'svelte/internal';

/**
 * INTERNAL, DO NOT USE. Code may change at any time.
 */
export interface Fragment {
	key: string | null;
	first: null;
	/* create  */ c: () => void;
	/* claim   */ l: (nodes: any) => void;
	/* hydrate */ h: () => void;
	/* mount   */ m: (target: HTMLElement, anchor: any) => void;
	/* update  */ p: (ctx: any, dirty: any) => void;
	/* measure */ r: () => void;
	/* fix     */ f: () => void;
	/* animate */ a: () => void;
	/* intro   */ i: (local: any) => void;
	/* outro   */ o: (local: any) => void;
	/* destroy */ d: (detaching: 0 | 1) => void;
}
interface T$$ {
	dirty: number[];
	ctx: null | any;
	cty: null | any;
	bound: any;
	update: () => void;
	callbacks: any;
	after_update: any[];
	props: Record<string, 0 | string>;
	fragment: null | false | Fragment;
	not_equal: any;
	before_update: any[];
	context: Map<any, any>;
	on_mount: any[];
	on_destroy: any[];
	skip_bound: boolean;
	on_disconnect: any[];
	root:Element | ShadowRoot
}

export function bind(component, name, callback) {
	const index = component.$$.props[name];
	if (index !== undefined) {
		component.$$.bound[index] = callback;
		callback(component.$$.ctx[index]);
	}
}

export function create_component(block) {
	block && block.c();
}

export function claim_component(block, parent_nodes) {
	block && block.l(parent_nodes);
}

export function mount_component(component, target, anchor, customElement) {
	const { fragment, on_mount, on_destroy, after_update } = component.$$;

	fragment && fragment.m(target, anchor);

	if (!customElement) {
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {

			const new_on_destroy = on_mount.map(run).filter(is_function);
			if (on_destroy) {
				on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
	}

	after_update.forEach(add_render_callback);
}

export function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		run_all($$.on_destroy);

		$$.fragment && $$.fragment.d(detaching);

		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
		$$.cty = {};
	}
}

function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}

/** Analyzes members of a chained memebers expression and returns an object holding references to a:
* 
* - 'clean' comp : the component to be made dirty (will be marked as `dirty` / flushed)
* - 'clean' prop : the property to be made dirty (will be marked as `dirty` / trigger related reactive statements)
*
* 'clean' means: has to be made dirty.
* 
* then it saves (caches) the result (the object) in a `cached_clean` object inside `cty` e.g.
* `$$.cty.cached_clean['foo|bar|baz'] = {comp:foo, prop:bar}` for `head.foo.bar.baz = value`
* 
* IMPORTANT:
* - For performance reasons this will happen only ONCE (runtime) for each type of MemberExpression (different chain members) being invalidated. 
*
* - Computed chain members generate their own `cc_key` (`cached_clean`-key), so if we're e.g. itterating over
*  an array containing mixed types of references (object, components etc.), each itteration will generate
*  it's own `cached_clean`-entry (`cc_key`) in order to get correct flushes (mark correct members as `dirty`).
* 
* - If the expression doesn't contain any computed members, the 'clean' result will be saved (cached)
* with the `cc_key` name 'static', e.g. `$$.cty.cached_clean['static'] = {comp: foo, prop: baz}`
*/
function get_clean(cty_entry:any, cc_key:string, component: SvelteComponentDev) {

	let last_comp_in_chain = undefined;
	let last_comp_in_chain_index = undefined;

	// 'clean' comp : the component to be made dirty
	let clean_comp: SvelteComponentDev = undefined;

	// 'clean' prop : the property to be made dirty
	let clean_prop = undefined;

	let i = cty_entry.members.length - 1;
	while (i >= 0) {
		if (cty_entry.members[i]?.$$) {
			last_comp_in_chain_index = i;
			last_comp_in_chain = cty_entry.members[i];
			break;
		}
		--i;
	}

	// remark: 'chain members' are be members following `cty_entry.head`, e.g. `head.chain_member_1.chain_member_2...`
	// means we're not including MemberExpresion's `head` when itterating through the 'chain members'.
	if (last_comp_in_chain) {
		// If there a member in chain following `last_comp_in_chain`:
		// set `last_comp_in_chain` as `clean_comp`
		const next_i = last_comp_in_chain_index + 1;
		// detect falsy members also
		if (cty_entry.members.length - 1 >= next_i) {	
			clean_comp = last_comp_in_chain;
			clean_prop = cty_entry.members[next_i];

			// update `chached_clean` / `cached_clean[cc_key]`
			cty_entry.cached_clean[cc_key] = {
				comp: clean_comp,
				prop: clean_prop
			};

			return cty_entry.cached_clean[cc_key];

			
		} else {
			// If there's no member in chain following `last_comp_in_chain`:
			// find the first component in chain preceding `last_comp_in_chain` if any.
			let i = cty_entry.members[last_comp_in_chain_index - 1];

			while (i >= 0) {
				if (cty_entry.members[i].$$) {
					clean_comp = cty_entry.members[i];

					// remark:
					// `clean_prop` would be the `last_comp_in_chain` itself in case there's another
					// component directly preceding it in chain, which would then be the `clean_comp`.
					clean_prop = cty_entry.members[i + 1];

					// update `chached_clean` / `cached_clean[cc_key]`
					cty_entry.cached_clean[cc_key] = {
						comp: clean_comp,
						prop: clean_prop
					};

					return cty_entry.cached_clean[cc_key];
				}
				--i;
			}

			// If `last_comp_in_chain` has no components preceding it in chain (and there's no member in chain following it)
			clean_comp = cty_entry.head.$$ ? cty_entry.head : component;
			clean_prop = cty_entry.head.$$ ? cty_entry.members[0] : cty_entry.head;

			// update `chached_clean` / `cached_clean[cc_key]`
			cty_entry.cached_clean[cc_key] = {
				comp: clean_comp,
				prop: clean_prop
			};

			return cty_entry.cached_clean[cc_key];
		}
	} else {
		// If none of the 'chain members' is a component
		clean_comp = cty_entry.head.$$ ? cty_entry.head : component;
		clean_prop = cty_entry.head.$$ ? cty_entry.members[0] : cty_entry.head;

		// update `chached_clean` / `cached_clean[cc_key]`
		cty_entry.cached_clean[cc_key] = {
			comp: clean_comp,
			prop: clean_prop
		};

		return cty_entry.cached_clean[cc_key];
	}
}

export function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
	const parent_component = current_component;
	set_current_component(component);

	const $$: T$$ = component.$$ = {
		fragment: null,
		ctx: null,
		cty: null,

		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),

		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),

		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	};

	append_styles && append_styles($$.root);

	let ready = false;

	function create_cty() {

		if ($$.cty === null && $$.ctx) {
			$$.cty = {};

			for (const k in component.$cty_config) {
				const head_index = component.$cty_config[k].head_ctx_i;

				$$.cty[k] = {
					get head() {
						return $$.ctx[head_index];
					},
					members: [],
					total: 0,
					endpoint_index: 0
				};

				$$.cty[k].members.props = {};

				component.$cty_config[k].members.map((item, index) => {
					const prop = !isNaN(item) ? Number(item) : item;

					if (!$$.cty[k].members.length) {
						
						$$.cty[k].members.props[index] = prop;
						Object.defineProperty($$.cty[k].members, index, {

						  get() {
							  return $$.cty[k].head[$$.cty[k].members.props[index]];
						  },

						  // updates computed chain members
						  set (ccm_value) {
							$$.cty[k].members.props[index] = ccm_value;
						  }
						}); 
						
					} else {

						$$.cty[k].members.props[index] = prop;
		
						Object.defineProperty($$.cty[k].members, index, {

							get() {
								return $$.cty[k].members[index - 1][$$.cty[k].members.props[index]];
							},

							// updates computed chain members
							set (ccm_value) {
								$$.cty[k].members.props[index] = ccm_value;
							}
						  });
					}
				});

				$$.cty[k].members_total = $$.cty[k].members.length;
				$$.cty[k].last_member_index = $$.cty[k].members_total - 1;

				$$.cty[k].cached_clean = {};

				// cc_key -> `cached_clean`-key
				$$.cty[k].clean = (cc_key: string) => {
					// `get_clean` will be executed only ONCE for each different MebmerExpression -> see `get_clean` method comment.
					return $$.cty[k].cached_clean[cc_key] ?? get_clean($$.cty[k], cc_key, component);
				};
			}
		}
	}

	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
			//  TODO  What about destructuring?! 
			
			// ### MODIFICATION
			if (component.$accMod) {

				if (rest.length && typeof ret === 'function') {
				
					let members;
					let clean;
					let clean_prop_index: number;
					let current_cty;

					// 'reactive-value-assign-property' test fix: added `if ($$.cty)`
					// remark: if $$.cty is available $$.ctx is also available: $$.cty is created after $$.ctx.
					if ($$.cty) {
						// reamrk: ccm / ccms -> computed chain member / members

						const ccms_values: any[] = [];
						current_cty = $$.cty[rest[1]];
						
						// update ccms if any (rest[2] will contain only ccms for e.g. head[ccm_1].foo[ccm_2]. ... = value)
						if (rest[2]) {
							const ccms_total = rest[2].length;
							let ccm_i = 0;
							while (ccm_i < ccms_total) {
								const ccm = rest[2][ccm_i]; // rest[2][i] = {ccm_key: ccm_value}
								const ccm_key = Object.keys(ccm)[0];
								const ccm_value = ccm[ccm_key];
								const ccm_cty_index = component.$cty_config[rest[1]].members.indexOf(ccm_key);

								ccms_values.push(ccm_value);

								current_cty.members[ccm_cty_index] = ccm_value;
								ccm_i++;
							}
						}

						members = current_cty.members;
						clean = ccms_values.length ? current_cty.clean(ccms_values.join('|')) : current_cty.clean('static');
						clean_prop_index = clean.comp.$$.ctx.indexOf(clean.prop);
					} else {
						return ret();
					}
					
					// current value of the prop / chain endpoint.
					const old_value = members[current_cty.last_member_index];

					// this will just update the value of the prop / chain endpoint.
					const new_value = ret();

					// INCONSISTENCY  with `immutable:true`: reactive statements bound to changed object type props will not be triggered! 
					// We're not setting the value here we're just checking old against new (current, already updated via ret()!)
					if (not_equal(old_value, new_value)) {
						if (!clean.comp.$$.skip_bound && clean.comp.$$.bound[clean_prop_index]) clean.comp.$$.bound[clean_prop_index](new_value);
						
						// 'bitmask-overflow' test fix: add `if(ready)`
						if (ready) make_dirty(clean.comp, clean_prop_index);
					}

					// 'invalidation-in-if-condition' test fix: the value is needed in order to evaluate conditions
					return new_value;

				} else {
					// ### ORIGINAL
					const value = rest.length ? rest[0] : ret;

					if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}

					return ret;
				}

			} else {
				// ### ORIGINAL
				const value = rest.length ? rest[0] : ret;

				if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}

				return ret;
			}
		})
		: [];

	// works here!
	create_cty();
		
	$$.update();
	ready = true;
	run_all($$.before_update);

	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;

	if (options.target) {
		if (options.hydrate) {
			start_hydrating();
			const nodes = children(options.target);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment!.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment!.c();
		}

		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor, options.customElement);
		end_hydrating();
		flush();
	}

	set_current_component(parent_component);
}

export let SvelteElement;
if (typeof HTMLElement === 'function') {
	SvelteElement = class extends HTMLElement {
		$$: T$$;
		$$set?: ($$props: any) => void;
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
		}

		connectedCallback() {
			const { on_mount } = this.$$;
			this.$$.on_disconnect = on_mount.map(run).filter(is_function);

			// @ts-ignore todo: improve typings
			for (const key in this.$$.slotted) {
				// @ts-ignore todo: improve typings
				this.appendChild(this.$$.slotted[key]);
			}
		}

		attributeChangedCallback(attr, _oldValue, newValue) {
			this[attr] = newValue;
		}

		disconnectedCallback() {
			run_all(this.$$.on_disconnect);
		}

		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop;
		}

		$on(type, callback) {
			// TODO should this delegate to addEventListener?
			const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
			callbacks.push(callback);

			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		$set($$props) {
			if (this.$$set && !is_empty($$props)) {
				this.$$.skip_bound = true;
				this.$$set($$props);
				this.$$.skip_bound = false;
			}
		}
	};
}

/**
 * Base class for Svelte components. Used when dev=false.
 */
export class SvelteComponent {
	$$: T$$;
	$$set?: ($$props: any) => void;

	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	$on(type, callback) {
		const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
		callbacks.push(callback);

		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	$set($$props) {
		if (this.$$set && !is_empty($$props)) {
			this.$$.skip_bound = true;
			this.$$set($$props);
			this.$$.skip_bound = false;
		}
	}
}
