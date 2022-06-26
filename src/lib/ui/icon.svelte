<script lang="ts">
  export let name: string;
</script>

<i class="fa-solid fa-{name}" />

<style>
  i {
    padding: 4px;

    font-size: var(--size, 20px);
  }
</style>
