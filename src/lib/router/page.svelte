<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext, setContext } from "svelte";

  export let name: string;
  export let show = false;
  export let fallback = false;

  name = (getContext("page") || "") + name;
  setContext("page", name + "/");

  const routes = getContext("routes") as Writable<Set<string>>;
  routes.update((x) => x.add(name));
</script>

<section data-page={name} data-fallback={fallback ? "" : null} class:show>
  <slot />
</section>

<style>
  section:not([data-fallback]) {
    display: none;
  }

  section.show {
    display: block !important;
  }
</style>
