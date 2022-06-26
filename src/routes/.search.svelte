<script>
  import Title from "$lib/ui/title.svelte";
</script>

<Title />

<section>
  <img
    src="/images/construction.svg"
    alt="Under Construction"
    id="temp-construction"
  />
  <label for="temp-construction">We are working on this feature...</label>
</section>

<style>
  section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: center;

    opacity: 0.7;
  }

  img {
    display: block;

    width: 40vw;
    margin: 1rem;
  }
</style>
