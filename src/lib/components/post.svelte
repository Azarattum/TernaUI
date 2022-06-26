<script lang="ts">
  import Avatar from "$lib/components/avatar.svelte";
  import Link from "$lib/router/link.svelte";
  import Stat from "./stat.svelte";
  import "highlight.js/styles/github.css";
  import hljs from "highlight.js";
  import { onMount } from "svelte";
  import { dislike, like } from "$api/functions";

  export let id: number;
  export let mark: number;
  export let author: { nickname: string; avatar: string; user: number };
  export let parent:
    | { post: number; nickname: string; user: number }
    | undefined;
  export let data: {
    lang: string;
    text: string;
    bugs: number;
    features: number;
    forks: number;
  };

  let code: HTMLElement;

  onMount(() => {
    hljs.highlightElement(code);
  });

  async function handleLike() {
    const response = await like(id);
    if (!response) return;
    const { bugs, features, mark: state } = response;
    data.bugs = bugs;
    data.features = features;
    mark = state;
  }

  async function handleDislike() {
    const response = await dislike(id);
    if (!response) return;
    const { bugs, features, mark: state } = response;
    data.bugs = bugs;
    data.features = features;
    mark = state;
  }
</script>

<article class="post-{id}">
  <header>
    <Link to="/profile/{author.user}" --size="2rem">
      <section>
        <Avatar source={author.avatar} />
        <h3>{author.nickname}</h3>
      </section>
    </Link>
    {#if parent}
      <span>
        feat. {parent?.nickname}
      </span>
    {/if}
  </header>
  <pre><code bind:this={code} class="language-{data.lang}">{data.text}</code
    ></pre>
  <footer>
    <div>
      <Stat
        on:click={handleLike}
        active={mark === 1}
        icon="puzzle-piece"
        value={data.features}
      />
      <Stat
        on:click={handleDislike}
        active={mark === -1}
        icon="bug"
        value={data.bugs}
      />
    </div>
    <button>
      <Stat icon="share" value={data.forks} />
    </button>
  </footer>
</article>

<style>
  header {
    margin-bottom: 0.5rem;
  }

  section {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  h3 {
    margin: 0;
  }

  span {
    display: block;

    margin: 0.3rem 0.3rem;

    opacity: 0.6;
  }

  pre {
    margin: 0;
  }

  code {
    display: block;

    padding: 1rem;

    border-radius: 8px;
    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.2);
  }

  article {
    margin: 1rem;
  }

  div {
    display: flex;
    gap: 1rem;
  }

  footer {
    display: flex;
    justify-content: space-between;

    margin: 0.5rem;
  }

  button {
    border: none;

    background: none;
    appearance: none;
  }
</style>
