<script lang="ts">
  import { profile, page } from "$api/stores";
  import { ready } from "$lib/asyncable";
  import { Link } from "$lib/router";
  import Icon from "./icon.svelte";

  $: nickname = ready($profile) ? $profile.nickname : "";
</script>

<nav>
  <button>
    <Link to="feed">
      <div class:active={$page.toString() == "Feed"}>
        <Icon name="home" />
        <span>Feed</span>
      </div>
    </Link>
  </button>
  <button>
    <Link to="profile">
      <div class:active={$page.toString() == nickname}>
        <Icon name="user" />
        <span>{nickname} </span>
      </div>
    </Link>
  </button>
  <button>
    <Link to="search">
      <div class:active={$page.toString() == "Search"}>
        <Icon name="search" />
        <span>Search</span>
      </div>
    </Link>
  </button>
</nav>

<style lang="postcss">
  nav {
    @mixin material-glass;

    display: flex;
    align-items: center;

    position: fixed;
    bottom: 0;

    width: 100%;

    height: calc(var(--unit) + 4px);
    border-right: none;
    border-bottom: none;
    border-left: none;
  }

  button {
    width: 100%;
    height: 100%;
    border: none;

    background: none;
    outline: none;
    appearance: none;
    -webkit-touch-callout: none;
  }

  div {
    display: flex;
    flex-direction: column;
    place-items: center;

    width: 100%;
    height: var(--unit);
    margin-top: 4px;

    color: var(--color-content);

    &.active {
      color: var(--color-accent);
    }
  }

  span {
    font-size: var(--font-caption);
    letter-spacing: 0.03em;
    line-height: 16px;
  }
</style>
