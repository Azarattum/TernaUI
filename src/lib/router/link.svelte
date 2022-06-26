<script lang="ts">
  import { getContext } from "svelte";

  export let to: string;

  let absolute = to[0] === "/";
  if (!absolute) to = (getContext("page") || "") + to;
  else to = to.replace(/^\//, "");
</script>

<a href="#/{to}"><slot /></a>

<style>
  a {
    text-decoration: none;

    color: var(--color-content);
  }
</style>
