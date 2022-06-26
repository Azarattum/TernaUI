<script lang="ts">
  import { writable } from "svelte/store";
  import { setContext } from "svelte";

  const css = (x: string) =>
    `[data-route^="${x}"][target]~main [data-page="${x}"],` +
    `[data-route^="${x}"]:target~main [data-page="${x}"]` +
    `{display:block}` +
    `[data-route^="${x}"][target]~main [data-fallback]:not([data-page^="${x}"]),` +
    `[data-route^="${x}"]:target~main [data-fallback]:not([data-page^="${x}"])` +
    `{display:none}`;

  const style = (x: Set<string>) => btoa([...x].map(css).join(""));
  let routes = setContext("routes", writable(new Set<string>()));

  // Force execute slot initializer
  let slot = eval("slots").default;
  if (Array.isArray(slot)) slot = slot[0];
  if (slot instanceof Function) {
    const { d } = slot();
    d?.(false);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="data:text/css;base64,{style($routes)}" />
  <!-- Enable instant navigation -->
  <script>
    document.addEventListener(
      "readystatechange",
      () => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) element.setAttribute("target", "");
      },
      { once: true }
    );
  </script>
</svelte:head>

{#each [...$routes] as route}
  <span data-route={route} id="/{route}" />
{/each}

<main>
  <slot />
</main>
