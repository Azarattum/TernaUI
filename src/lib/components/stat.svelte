<script lang="ts">
  import Icon from "$lib/ui/icon.svelte";

  export let icon: string;
  export let value: number;
</script>

<div>
  <Icon name={icon} />
  <span>{value}</span>
</div>
