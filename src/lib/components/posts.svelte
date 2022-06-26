<script lang="ts">
  import type { Post as PostInfo } from "$api/types";
  import Post from "./post.svelte";

  export let posts: PostInfo[];
</script>

{#each posts as post}
  <Post {...post} />
  <hr />
{/each}
