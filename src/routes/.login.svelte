<script lang="ts">
  import { pannable } from "$lib/actions/pannable";
  import Title from "$lib/ui/title.svelte";
  import { token } from "$api/stores";
  import { login, register } from "$api/functions";

  export let open = false;
  $: if (open) panel?.click();
  else handle?.click();

  let handle: HTMLElement | undefined;
  let panel: HTMLElement | undefined;
  let registration = false;

  let loginemail = "";
  let nickname = "";
  let email = "";
  let password = "";

  $: forced = $token instanceof String && !$token.toString();
  $: if (forced && !open) open = true;

  async function handleLogin() {
    await login(loginemail, password);
    if (await $token) open = false;
  }

  async function handleRegister() {
    await register(email, nickname, password);
    if (await $token) open = false;
  }
</script>

<section
  use:pannable={{ gap: 16, handle: ".settings-handle" }}
  bind:this={panel}
  on:open={() => (open = true)}
  on:close={() => forced && panel?.click()}
  style:opacity={+open}
  style:pointer-events={open ? "all" : "none"}
>
  <div class="settings-handle" on:click|stopPropagation />
  {#if !registration}
    <Title text="Welcome!" />
  {:else}
    <Title text="Nice to meet you!" />
  {/if}
  {#if !registration}
    <label for="loginemail">Login / Email</label>
    <input bind:value={loginemail} type="text" id="loginemail" />
  {:else}
    <label for="login">Login</label>
    <input bind:value={nickname} type="text" id="login" />
    <label for="Email">Email</label>
    <input bind:value={email} type="Email" id="Email" />
  {/if}
  <label for="password">Password</label>
  <input bind:value={password} type="password" id="password" />

  {#if !registration}
    <button class="primary" on:click={handleLogin}>Login</button>
    <button on:click={() => (registration = true)}>Register</button>
  {:else}
    <button class="primary" on:click={handleRegister}>Register</button>
    <button on:click={() => (registration = false)}>Back</button>
  {/if}
</section>

<style lang="postcss">
  section {
    @mixin material-glass;

    display: flex;
    flex-direction: column;

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

    background-color: var(--color-text-caption);
    border-radius: 5px;

    cursor: pointer;
  }

  label {
    margin: 1rem;
    margin-bottom: -0.5rem;
  }

  input {
    font-size: 1.1rem;
  }

  button {
    margin-top: 2rem !important;
    margin-bottom: -1rem !important;

    font-size: 1.5rem;

    &.primary {
      color: white;
      background-color: var(--color-content);
    }
  }

  input,
  button {
    display: block;

    padding: 0.5rem;
    margin: 1rem;
    border: var(--border-glass);

    border-radius: 8px;
    appearance: none;
  }
</style>
