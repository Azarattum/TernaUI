<script>
  import Posts from "$lib/components/posts.svelte";
  import Spinner from "$lib/ui/spinner.svelte";
  import Title from "$lib/ui/title.svelte";
  import { feed } from "$api/stores";
</script>

<Title />
{#await $feed}
  <Spinner />
{:then feed}
  <Posts posts={feed} />
{/await}
