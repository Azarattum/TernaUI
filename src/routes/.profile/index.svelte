<script>
  import Avatar from "$lib/components/avatar.svelte";
  import Posts from "$lib/components/posts.svelte";
  import Spinner from "$lib/ui/spinner.svelte";
  import Title from "$lib/ui/title.svelte";
  import { profile, wall } from "$api/stores";
  import Stat from "./stat.svelte";
  import Bio from "./bio.svelte";
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
  {#await $wall}
    <Spinner />
  {:then wall}
    <Posts posts={wall} />
  {/await}
{/await}

<style>
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
</style>
