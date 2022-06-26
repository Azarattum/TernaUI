<script lang="ts">
  import { page } from "$stores/page";
</script>

<h1>{$page}</h1>

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
