<script>
  import { Router, Page } from "$lib/router/";
  import Profile from "./.profile/index.svelte";
  import Search from "./.search.svelte";
  import Feed from "./.feed.svelte";
  import Statusbar from "$lib/ui/statusbar.svelte";
  import Navbar from "$lib/ui/navbar.svelte";
  import Tabbar from "$lib/ui/tabbar.svelte";
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
