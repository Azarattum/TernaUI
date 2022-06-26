<script lang="ts">
  import { Capacitor } from "@capacitor/core";
  import { onDestroy, onMount } from "svelte";
  import { ready } from "$lib/asyncable";
  import { page } from "$api/stores";

  let bar: HTMLElement;

  let observer: IntersectionObserver | undefined;
  onMount(() => {
    observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(bar);
  });

  onDestroy(() => observer?.disconnect());
</script>

<div
  bind:this={bar}
  class:stuck={false}
  class:app={Capacitor.getPlatform() === "ios"}
>
  <h2>{ready($page) ? $page : ""}</h2>
</div>

<style lang="postcss">
  div {
    @mixin material-glass;

    display: flex;
    justify-content: center;

    position: sticky;
    top: -1px;

    height: var(--unit);

    padding-top: 1px;
    border-top: none;
    border-right: none;
    border-left: none;

    opacity: 0;

    transition: opacity var(--animation-normal);

    &.stuck {
      opacity: 1;
    }

    &.app {
      padding-top: 21px;
    }
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--font-normal);
    letter-spacing: 0.01em;
  }
</style>
