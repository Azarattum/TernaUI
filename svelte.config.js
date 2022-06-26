import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import mixins from "postcss-mixins";
import nested from "postcss-nested";
import autoprefixer from "autoprefixer";
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: {
      plugins: [
        mixins({
          mixinsDir: resolve("./src/lib/ui/"),
        }),
        nested,
        autoprefixer,
      ],
    },
  }),

  kit: {
    alias: {
      $stores: "src/stores",
      $api: "src/api",
    },
    prerender: { default: true },
    adapter: adapter(),
  },
};

export default config;
