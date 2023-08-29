import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte'
    }),
  ],
  optimizeDeps: {
    exclude: [
      "codemirror",
      "@codemirror/autocomplete",
      "@codemirror/commands",
      "@codemirror/language-javascript",
      "@codemirror/language",
      "@codemirror/lint",
      "@codemirror/search",
      "@codemirror/state",
      "@codemirror/theme-one-dark",
      "@codemirror/view",
    ],
  },
});
