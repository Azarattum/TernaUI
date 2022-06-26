<script lang="ts">
  import { onMount } from "svelte";
  export let source = "";

  let frame: HTMLIFrameElement;
  onMount(() => {
    const document = frame.contentDocument;
    if (!document) return;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = `data:text/css;base64,${btoa(source)}`;
    document.head?.appendChild(style);
  });
</script>

<iframe bind:this={frame} title="avatar" frameborder="0" />

<style>
  iframe {
    width: var(--size);
    height: var(--size);
    aspect-ratio: 1/1;

    border-radius: 100%;
  }
</style>
