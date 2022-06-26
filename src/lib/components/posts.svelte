<script lang="ts">
  import Post from "./post.svelte";
  import Spinner from "$lib/ui/spinner.svelte";
  import { postable } from "$stores/api";
  import { onMount } from "svelte";
  import { readable } from "svelte/store";

  export let user: number | undefined = undefined;

  let posts = readable([]) as any;
  onMount(() => {
    posts = postable(user);
  });
</script>

{#await $posts}
  <Spinner />
{:then data}
  {#each data as post}
    <Post {...post} />
  {/each}
{/await}
