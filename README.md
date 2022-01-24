**DISCLAIMER**:

This is **NOT an official Svelte project**! All of the **listed contributors (*other than myself*) are the official / original Svelte version contributors**, **NOT *svelte-accmod* contributors**.

This project was initially meant to be a contribution to Svelte (*part of an RFC*), but I then decided to publish it first. Why?

- I need it for [svelthree](https://github.com/vatro/svelthree) anyway.
- I'd like to see if this idea gets any attention (interest) at all before filing an RFC, since it originates in a pretty special Svelte use case (*svelthree*).

---

# svelte-accmod

**svelte-accmod** is an **opinionated** (*modified*) version of [Svelte](https://github.com/sveltejs/svelte) favoring accessors (*modified functionality*) over $set-syntax as default syntax incl. some reactivity and lifecycle behavior changes related to accessors-usage.

- see ["Motivations"](#motivations)
- see ["Remarks and Features"](#remarks-and-features)
- see ["Drawbacks"](#drawbacks)





## Getting Started

#### Fresh start using svelte-accmod as dev dependency

For a fresh Svelte project having svelte-accmod as dev dependency instead of original [Svelte](https://github.com/sveltejs/svelte) it's best to use the [svelte-accmod-app](https://github.com/vatro/svelte-accmod-app) template which is a modified version of the [official svelte starter template](https://github.com/sveltejs/template). The installation process is basically the same. All standard deployment workflows described on the [original repo](https://github.com/sveltejs/template) should also be the same (! *not tested yet* !).

Using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit vatro/svelte-accmod-template svelte-accmod-app
cd svelte-accmod-app
npm install
```

If you want to use TypeScript, after installation (*or right after cloning the template via e.g. degit, see above.*):

```bash
node scripts/setupTypeScript.js
```



#### Patching existing Svelte projects (also [SvelteKit](https://kit.svelte.dev/) templates)

For existing Svelte and SvelteKit projects you can use the handy [**svelte-accmod-patch**](https://github.com/vatro/svelte-accmod-patch):

```bas
npm install svelte-accmod-patch --save-dev
npx svelte-accmod-patch
```

or simply:

```
npx svelte-accmod-patch
```

if you don't want to install svelte-accmod-patch locally as dependency.
See [svelte-accmod-patch](https://github.com/vatro/svelte-accmod-patch#readme) for more informations.



👉 **Use svelte-accmod as you would use 'unmodified' Svelte!**

svelte-accmod should generally allow you to **care *less*** rather than to care *more* about something. Accessors usage is favored / encouraged, but you can use $set(...) only or alongside accessors with **no restrictions**! Only accessors will behave differently, actually the same if you were using $set(...) -> simply **try to use accessors for everything you'd normally use $set(...)**.

- see ["Remarks and Features"](#remarks-and-features)
- see ["Drawbacks"](#drawbacks)





### Compatibility

**svelte-accmod** is basically Svelte + some modifications **passing all standard Svelte tests** except of the newly ONE added (`binding-select-unmatched` *-> can't see anything wrong with it in "real life" though* 🤷‍♂️). It **should break** accessors-centric projects relying on synchronous updating, respectively exploiting all the things being "'wrong" with accessors from svelte-accmod's perspective.

- see ["Remarks and Features"](#remarks-and-features)
- see ["Drawbacks"](#drawbacks)





## Motivations

#### svelthree

This project was started as an attempt to address / "fix" several [accessors-usage](#favoring-accessors-syntax)-caveats *(identified as such -> opinionated)* that popped up during [svelthree](https://github.com/vatro/svelthree) development, especially components' update behavior in complex default-slot-based component structures *(like component based threejs scene graphs)* using top-level declared (*or saved inside top-level declared objects and arrays*) component references (*resulting in much lower performance compared to using $set*) and reactivity of exported (*accessed via accessors-syntax*) objects and arrays, in order to bend the overall svelthree developer experience in the wanted direction.



#### Favoring Accessors-Syntax

🤩

The accessors-syntax means less writing, is more readable and more intuitive than the default [$set](https://svelte.dev/docs#$set)-syntax. It's basically `component.foo=1` vs. `component.$set({foo:1})`. 

😕

Unfortunately accessors usage comes with several disadvantages and caveats *(identified as such -> opinionated)* compared to using $set. One of the main ones are e.g. accessors-syntax being hard-wired to synchronous (*after first component update only!*) component updating (*immediate flush() after $set(..) in accessor-setters*) loosing all performance benefits of the asynchronous (*scheduled*) $set-syntax, see ["Remarks and Features"](#remarks-and-features) for more details.

Additionally accessors-syntax was kind of *thrown under the bus* at some point, with `accessors:false` being the default compiler options setting all because its hard-wired "core"-functionality (*synchronous updating*) turns out to be something not necessarily needed, see [Rich Harris himself stating](https://github.com/sveltejs/svelte/pull/2242#issuecomment-473671557) :

> "**Is there a situation where it's necessary to update a component synchronously** (as opposed to `$set(...)` followed by `await tick()`, which has the same result as far as the user is concerned)**?** **I'm inclined to file it under YAGNI* until proven otherwise**" 

**You Aren't Gonna Need It*

*Remark: Svelte tests heavily rely on accessors' synchronous update functionality, so all tests using accessors had to be modified for 'svelte-accmod' where accessors are asynchronous, see ["Remarks and Features"](#remarks-and-features)*



#### Accessors Revamped - From YAGNI to Standard-Syntax

**svelte-accmod** addresses several main accessors-usage issues *(identified as such -> opinionated)* and additionally equips accessors with some extra functionality / behavior aiming to make the accessors-syntax if not better, then at least a true alternative to the $set-syntax.





## Remarks and Features 

*work in progress (more detailed with svelte-accmod vs. unmodified Svelte examples)...*

**svelte-accmod** aims to make the already great Svelte developer experience even more intuitive / **more vanilla**. You should be able to use accessors without having to worry about unexpected / unwanted component updates (*unexpected / unwanted lifecycle behavior*) possibly resulting in confusion and performance issues. Accessing and modifying component's props programmatically should result in intuitively expected, predictable component updates and triggering of reactive statements, basically equal to effects of using $set(...) + some extra goodies.



- **Compile option `accessors` is hard-set to `true`**, changing it to `false` *will have no effect*.

  

- **Accessor-statements are asynchronous** / scheduled (*just like $set-statements*), **the synchronous update functionality originally bound to accessors-usage has been removed** because svelte-accmod presupposes / proposes a **consequent deprecation of the "synchronous update syntax"**. 💡 You can (*as always*) use `await tick()` if you need to sync DOM at a certain point in your code.

  

- **Made for the standard** `immutable:false` **mode**. `immutable:true` will prevent some intuitively expected triggering of reactive statements, yet the correct / intended components update behavior will *not be affected* by `immutable:true`.



- **Fixes** issues with **unexpected component update behavior** containing accessor-statements **using top-level (main context) declared component-references**. (**!!!**) In unmodified Svelte these issues are especially critical with **complex (*deep*), default-slot-nested component-structures** (*like e.g. complex [svelthree](https://github.com/vatro/svelthree) scene graphs*) being modified very frequently (*like e.g. on every AnimationFrame / e.g. 60 times per second*).



- **Fixes** issues with **unexpected component update behavior** while simply **using / accessing component-references saved inside top-level (*main context*) declared objects and arrays**.



- ⚡ **No need to re-assign objects and arrays in order to trigger component updates or corresponding reactive statements**, just **export** the object or the array that needs to cause a component update / trigger reactive statements on change! 

  *see [https://svelte.dev/tutorial/updating-arrays-and-objects](https://svelte.dev/tutorial/updating-arrays-and-objects)*

  For example this **will** trigger reactivity on `obj.foo.bar` :

  ```svelte
  const foo = obj.foo;
  foo.bar = 'baz';
  ```

  you **don't have to** follow it up with `obj = obj` .

  

  You can actually go pretty wild, with e.g. something like this:

  *see **test** [accmod-benefit-updating-arrays-and-objects--obj-extreme-1-b](https://github.com/vatro/svelte-accmod/tree/main/test/runtime/samples)*

  ```svelte
  <!-- ComponentA.svelte -->
  <script>
  
  // needs to be exported!
  export let obj = { foo:{ bar: { baz: { val: 0, }, }, }, };
  
  let current_val = 0 // will be reactively set to the value of 'foo.bar.baz.val'
  
  $: current_val = obj.foo.bar.baz.val // will be triggered if 'foo.bar.baz.val' changes
  
  export function change(value) {
  
  	const _obj = obj;
  	const _foo = _obj.foo;
  	const _bar = _foo.bar;
  	const _baz = _bar.baz;
  
  	_baz.val = value; // will change 'foo.bar.baz.val' and trigger the reactive statement above!
  }
  
  </script>
  ```

  and this will also work if you're targeting `obj` from some other component, like:

  ```svelte
  <!-- ComponentB.svelte -->
  
  <script>
  import { onMount, tick } from 'svelte'
  import ComponentA from 'ComponentA.svelte'
  
  let compA
  
  onMount(() => {
  	await tick()
  	
  	// will be async / reactive! -> reactive statement in ComponentA will be triggered only ONCE!
  	compA.obj.foo.bar.val = 1
  	compA.change( 2 )
  })
  
  </script>
  
  <ComponentA bind:this={compA}/>
  
  ```

  

*to be continued ...*





### Drawbacks

- **Slight performance loss** (*currently about 20% slower, which should be noticable only in extremely performance-hungry apps (edge cases) running on slow machines -> e.g. when [svelthree](https://github.com/vatro/svelthree) is running at 6x slowdown in Chrome*) compared to using the $set-syntax. The performance is also depending on the total amount of different assignments, member expressions etc. using top-level declared variables (*need to be invalidated*) in your code. (***needs more testing 'in the wild' / performance reports!***)
- **Slightly bigger bundle size** depending on the amount of different assignments, member expressions etc. using top-level declared variables (*need to be invalidated*). (***needs more testing 'in the wild' / bundle size increase reports!***)

'svelte-accmod' benefits should ideally at least make up for these drawbacks, but this is up to you to decide, happy trying out!  🚀
