<script>
  import Avatar from "$lib/components/avatar.svelte";
  import Posts from "$lib/components/posts.svelte";
  import Spinner from "$lib/ui/spinner.svelte";
  import Title from "$lib/ui/title.svelte";
  import { hero, profile, wall } from "$api/stores";
  import Stat from "./stat.svelte";
  import Bio from "./bio.svelte";
  import Icon from "$lib/ui/icon.svelte";
  import { open } from "../.poster.svelte";

  $: mine = $hero == undefined;

  function handlePost() {
    open.set(true);
  }
</script>

{#await $profile}
  <Spinner />
{:then profile}
  <Title />
  <section>
    <Avatar source={profile.avatar} --size="30vw" />
    <div class="details">
      <div class="stats">
        <Stat icon="puzzle-piece" value={profile.features} />
        <Stat icon="bug" value={profile.bugs} />
        <Stat icon="share" value={profile.forks} />
      </div>
      <Bio text={profile.bio} />
    </div>
  </section>
  <hr />
  {#if mine}
    <button on:click={handlePost}><Icon name="plus" /></button>
  {/if}
  {#await $wall}
    <Spinner />
  {:then wall}
    <Posts posts={wall} />
  {/await}
{/await}

<style lang="postcss">
  section {
    display: flex;
    gap: 16px;

    margin: 16px;
  }

  .stats {
    display: flex;
    justify-content: space-between;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
  }

  button {
    display: block;

    width: calc(100% - 2rem);
    padding: 0.5rem;
    margin: 1rem;

    border: var(--border-glass);

    background: none;
    border-radius: 8px;

    &:active {
      background-color: hsla(0, 0%, 70%, 0.6);
    }
  }
</style>
