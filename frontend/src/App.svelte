<script lang="ts">
  import { Greet } from "../wailsjs/go/main/App.js";
  import { css } from "../styled-system/css";
  import FolderNavigation from "./FolderNavigation.svelte";
  import FolderContent from "./FolderContent.svelte";
  import FileContent from "./FileContent.svelte";

  let resultText: string = "Please enter your name below 👇";
  let name: string = "default";

  async function greet(): Promise<string> {
    return await Greet(name);
  }
</script>

<main
  class={css({
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 5fr',
    height: '100vh',
    maxHeight: '100vh',
    width: '100vw',
    bg: '#282a35',
  })}
>
  <!-- {#await greet() then n}
    {n}
  {/await} -->

  <FolderNavigation />
  <FolderContent />
  <FileContent />
</main>
