# svelte-accmod changelog
*Release version matches Svelte version.*

## 3.47.0

- Rebased onto Svelte 3.47.0

## 3.46.6

- Rebased onto Svelte 3.46.6

## 3.46.5

- Rebased onto Svelte 3.46.5

## 3.46.4

- Rebased onto Svelte 3.46.4

## 3.46.3

- Rebased onto Svelte 3.46.3

## 3.46.2

- Rebased onto Svelte 3.46.2

## 3.46.1

- Rebased onto Svelte 3.46.1

## 3.46.0

- Rebased onto Svelte 3.46.0

## 3.45.0

- Rebased onto Svelte 3.45.0

## 3.44.3

- Rebased onto Svelte 3.44.3

## 3.44.2-1

- **FIX**  for using a reference to an item of an unexported top-level declared array in a member expression inside a loop, e.g.:
  ```html
	<!-- App.svelte -->
	
    <script>
    // Additional REMARK: since 'foo' is not exported, changes won't be reactive.
    // Exporting 'foo' would make it reactive and the below (see loop) would work without the current fix.
    let foo = [{}, {}, {}]
	
    function fn() {    
        for (let i = 0; i < foo.length; i++) {
            // this previously worked only if 'foo' was exported!
            const element_of_foo = foo[i];
            element_of_foo.bar = baz
        } 
    }
    </script>
  ```

## 3.44.2

- Rebased to Svelte 3.44.2
- README.md:
  - added [svelte-accmod-patch](https://github.com/vatro/svelte-accmod-patch) option to "Getting Started"
  - some minor text changes

## 3.44.1

First release.

