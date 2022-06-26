<script lang="ts">
  import Icon from "$lib/ui/icon.svelte";

  export let active = false;
  export let icon: string;
  export let value: number;
</script>

<div class:active>
  <Icon name={icon} />
  <span>{value}</span>
</div>

<style>
  div {
    padding: 4px;
    margin: -4px;

    border-radius: 4px;
  }

  div:active {
    background-color: rgba(10, 189, 189, 0.3);
    outline: 1px solid rgba(10, 189, 189);
  }

  div.active {
    color: rgb(7, 151, 151);
  }
</style>
