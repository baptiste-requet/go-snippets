<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import IconAdd from "~icons/material-symbols/add";
  import IconClose from "~icons/material-symbols/close";
  import { css } from "../styled-system/css";
  import { CreateFolder, DeleteFolder } from "../wailsjs/go/main/App.js";
  import type { main } from "../wailsjs/go/models";
  import { folders, selectedFolder } from "./store.js";

  const NEW_FOLDER_DEFAULT_NAME = "Untitled folder";

  function selectFolder(folder) {
    selectedFolder.set(folder);
  }

  async function createFolder() {
    await CreateFolder(NEW_FOLDER_DEFAULT_NAME);
    folders.refresh();
  }

  function deleteFolder(folder: main.Folder) {
    DeleteFolder(folder.id);
    folders.refresh();
  }

  onMount(async () => {
    await folders.refresh();
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
      display: "flex",
      alignItems: "center",
    })}
  >
    <span>Folders</span>

    <button
      on:click={createFolder}
      class={css({
        _hover: { bg: "gray.700" },
        py: "0.1rem",
        px: "0.2rem",
        ml: "auto",
        cursor: "pointer",
        borderRadius: "0.4rem",
      })}
    >
      <IconAdd />
    </button>
  </div>

  <ul class={css({ mt: "2" })}>
    {#if $folders && $folders.length > 0}
      {#each $folders as folder}
        <li
          class={css({
            cursor: "pointer",
            py: "1",
            px: "4",
            bg: {
              base: $selectedFolder?.id === folder.id ? "#424453" : "",
              _hover: $selectedFolder?.id === folder.id ? "" : "#373947",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
          on:click={() => selectFolder(folder)}
        >
          <span>{folder.name}</span>
          <button on:click|stopPropagation={() => deleteFolder(folder)} class={css({
            cursor: "pointer"
          })}>
            <IconClose />
          </button>
        </li>
      {/each}
    {:else}
      <p
        class={css({
          py: "1",
          px: "4",
          color: "gray.600",
        })}
      >
        No folders found.
      </p>
    {/if}
  </ul>
</div>
