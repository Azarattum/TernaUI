<script>
  import Statusbar from "$lib/ui/statusbar.svelte";
  import Profile from "./.profile/index.svelte";
  import { Router, Page } from "$lib/router/";
  import Navbar from "$lib/ui/navbar.svelte";
  import { route } from "$api/stores";
  import Tabbar from "$lib/ui/tabbar.svelte";
  import Login from "./.login.svelte";
  import Search from "./.search.svelte";
  import Feed from "./.feed.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    route.set(location.hash);
    window.addEventListener("hashchange", () => {
      route.set(location.hash);
    });
  });
</script>

<Router>
  <Statusbar />
  <Navbar />
  <Page name="feed" fallback>
    <Feed />
  </Page>
  <Page name="profile">
    <Profile />
  </Page>
  <Page name="search">
    <Search />
  </Page>
  <Tabbar />
</Router>
<Login />
