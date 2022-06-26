<script context="module" lang="ts">
  let text = writable("");
  let lang = writable("css");
  let feat = writable<{ nickname: string; post: number } | undefined>(
    undefined
  );
  let open = writable(false);

  export function post(from?: {
    nickname: string;
    post: number;
    text: string;
    lang: string;
  }) {
    feat.set(from);
    open.set(true);
    if (from) {
      text.set(from?.text);
      lang.set(from?.lang);
    }
  }
</script>

<script lang="ts">
  import { publish } from "$api/functions";

  import { pannable } from "$lib/actions/pannable";
  import Title from "$lib/ui/title.svelte";
  import hljs from "highlight.js";
  import { writable } from "svelte/store";

  let handle: HTMLElement | undefined;
  let panel: HTMLElement | undefined;

  $: if ($open) panel?.click();
  else handle?.click();

  $: colored = hljs.highlight($text, { language: $lang }).value;

  async function handlePublish() {
    await publish($lang, $text, $feat?.post);
    $open = false;
    $lang = "css";
    $text = "";
  }
</script>

<section
  use:pannable={{ gap: 16, handle: ".settings-handle" }}
  bind:this={panel}
  on:open={() => ($open = true)}
  on:close={() => ($open = false)}
  style:opacity={+$open}
  style:pointer-events={$open ? "all" : "none"}
>
  <div class="settings-handle" on:click|stopPropagation />
  <Title text="Post" />
  {#if $feat}
    <span>feat. {$feat.nickname}</span>
  {/if}
  <select bind:value={$lang}>
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
    <option value="css">CSS</option>
    <option value="html">HTML</option>
    <option value="xml">XML</option>
    <option value="cpp">C++</option>
    <option value="c">C</option>
    <option value="cs">C#</option>
    <option value="python">Python</option>
    <option value="ruby">Ruby</option>
    <option value="rust">Rust</option>
    <option value="sql">SQL</option>
    <option value="php">PHP</option>
    <option value="1c">1C</option>
    <option value="bash">Bash</option>
    <option value="brainfuck">Brainfuck</option>
    <option value="avrasm">AVR Assembler</option>
    <option value="swift">Swift</option>
    <option value="java">Java</option>
    <option value="kotlin">Kotlin</option>
  </select>
  <article>
    <pre class="language-{$lang}" name="code">{@html colored}</pre>
    <textarea bind:value={$text} />
  </article>

  <button class="primary" on:click={handlePublish}>Publish</button>
</section>

<style lang="postcss">
  section {
    @mixin material-glass;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: fixed;
    bottom: calc(-1 * 100vh - 16px);

    width: 100%;
    height: 100vh;
    max-width: 100%;

    border-radius: 16px 16px 0 0;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);

    z-index: 2000;
  }

  .settings-handle {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    width: 35px;
    height: 5px;

    margin: 12px 0 8px 0;

    background-color: grey;
    border-radius: 5px;

    cursor: pointer;
  }

  button {
    margin-bottom: 3rem !important;

    font-size: 1.5rem;

    &.primary {
      color: white;
      background-color: var(--color-content);
    }
  }

  select,
  button {
    display: block;

    padding: 0.5rem;
    margin: 1rem;
    border: var(--border-glass);

    border-radius: 8px;
    appearance: none;
  }

  pre {
    height: 100%;
    padding: 0.5rem;
    margin: 0;
  }

  article {
    position: relative;

    height: 100%;
    margin: 1rem;

    font-family: monospace;
    font-size: 18px;

    border-radius: 8px;

    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.2);
  }

  textarea {
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border: none;

    font-family: monospace;
    font-size: 18px;

    color: transparent;
    background-color: transparent;
    outline: none;
    caret-color: black;
  }

  span {
    margin-left: 1rem;

    opacity: 0.6;
  }
</style>
