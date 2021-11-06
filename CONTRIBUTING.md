# Contributing to 'svelte-accmod'

This is a bit complicated at the moment and might be reconsidered if a better solution pops up, **suggestions are very welcome**! The 'problem' is that 'svelte-accmod'-modifications have to always be put on top of the Svelte master branch, which means rebasing and forced pushing which is generally considered to be bad for collaboration.

**Branch hierarchy:**

`dev-1-optional` 
*starting point, modifications are optional*

- `dev-2-default` 
  *default version, modifications are the default / obligatory*
  - `dev-3-release` 
    *`README.md`, `CONTRIBUTING.md`  and `package.json`  changes*

`main` 
*force pushed `dev-3-release` + tagged `CHANGELOG.md` change as commit*



**Current workflow:**

- Create a new branch based on the `dev-1-optional` branch

  `dev-1-optional`  is the initial version of 'svelte-accmod' where the modifications made are optional, means they can be 'turned on/off' by setting compile options `useAccMod` and `accessorsAsync` to `true` or `false` (*important: both options should be set to `true` the same value for the full 'accmod'-effect*). This version might be dropped in future but is currently the starting point for everything else.

- Make changes

  Frequent rebasing on `dev-1-optional`  during development is recommended.

- Pull request

Generally: **all changes have to be force pushed after each rebase**.

What happens from here is:

- `dev-2-default`  has to be rebased on the updated `dev-1-optional`

  `dev-2-default` is a version of 'svelte-accmod' where the modifications are `default` , means the compile options `useAccMod` and `accessorsAsync` are not available. `accessors` are always `true` (*setting `accessors:false` will have no effect*) and asynchronous (*`flush()` is omitted from setters*) and all 'svelte-accmod' modifications are unconditional. This is the version to be published!

- `dev-3-release` has to be rebased on the updated `dev-2-default`

  In this branch only `README.md`, `CONTRIBUTING.md`  and `package.json`  are edited.

- `main` has to be rebased on the updated `dev-3-release` and force pushed, and finally:

  -  the `CHANGELOG.md` has to be updated (*vX.Y.Z*), tagged (*accmod-vX.Y.Z*) and **commited** (not force pushed)

  

*this workflow will be tested over several Svelte updates before going public and might change...*



# Contributing to Svelte

see [https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md](https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md)

## License

<<<<<<< HEAD
By contributing to 'svelte-accmod', you agree that your contributions will be licensed under its [MIT license](https://github.com/vatro/svelte-accmod/blob/main/LICENSE.md).
=======
By contributing to 'svelte-accmod', you agree that your contributions will be licensed under its [MIT license](https://github.com/sveltejs/svelte/blob/master/LICENSE).
>>>>>>> 03b60700b (Setup initial CONTRIBUTING.md)

