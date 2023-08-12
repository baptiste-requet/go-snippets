<script lang="ts">
  import { CreateFolder, GetAllFolders } from "../wailsjs/go/main/App.js";
  import type { main } from "../wailsjs/go/models";
  import { css } from "../styled-system/css";
  import { onMount } from "svelte";

  let selectedFolder = null;

  let folders: main.Folder[] = [];

  function selectFolder(folder) {
    selectedFolder = folder;
  }

  async function getAllFolders(): Promise<main.Folder[]> {
    return await GetAllFolders();
  }

  async function createFolder() {
    console.log("Creating a new folder");
    const createdFolder: main.Folder = await CreateFolder("new folder");
    console.log("Created now folder !", createdFolder.name, ". Refreshing...");
    refreshFolders();
  }

  function refreshFolders(): void {
    getAllFolders().then((fetchedFolders) => (folders = fetchedFolders));
  }

  onMount(() => {
    refreshFolders();
  });
</script>

<div
  class={css({
    display: "flex",
    flexDir: "column",
    w: "16rem",
  })}
>
  <div
    class={css({
      py: "2px",
      px: "4px",
      w: "16rem",
      color: "text-gray-700",
      fontWeight: "bold",
    })}
  >
    Folders
  </div>

  <button on:click={createFolder}> Create a new folder </button>

  <ul class={css({ mt: "2" })}>
    {#each folders as folder}
      <li
        class={css({
          cursor: "pointer",
          py: "1",
          px: "4",
          bg: { _hover: "#373947" },
        })}
        on:click={() => selectFolder(folder)}
        class:font-bold={folder === selectedFolder}
      >
        {folder.name}
      </li>
    {/each}
  </ul>
</div>
