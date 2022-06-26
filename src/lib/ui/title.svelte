<script lang="ts">
  import { ready } from "$lib/asyncable";
  import { page } from "$api/stores";

  export let text: string | undefined = undefined;
  $: value = text == null ? (ready($page) ? $page : "") : text;
</script>

<h1>{value}</h1>

<style>
  h1 {
    display: flex;
    align-items: flex-end;

    height: var(--unit);
    margin: 0;

    font-family: var(--font-heading);
    font-size: var(--font-large);
    text-indent: 16px;
    letter-spacing: 0.01em;
  }
</style>
