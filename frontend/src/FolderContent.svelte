<script lang="ts">
  import type { main } from "wailsjs/go/models.js";
  import IconAdd from "~icons/material-symbols/add";
  import IconClose from "~icons/material-symbols/close";
  import { css } from "../styled-system/css";
  import { CreateFile, DeleteFile } from "../wailsjs/go/main/App.js";
  import { folders, selectedFile, selectedFolder } from "./store.js";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";

  let files: main.File[] = [];

  const NEW_FOLDER_DEFAULT_NAME = "Untitled file";

  function selectFile(file) {
    selectedFile.set(file);
  }

  async function createFile() {
    await CreateFile(NEW_FOLDER_DEFAULT_NAME, "txt", null, $selectedFolder.id);
    folders.refresh();
  }

  function deleteFile(file: main.File) {
    DeleteFile(file.id);
    folders.refresh();
  }

  onMount(async () => {
    selectedFolder.subscribe((folder) => {
      if (folder === null) {
        return;
      }

      files = folder.files;

      if (get(selectedFile)?.folderId !== folder.id && files?.length > 0) {
        console.log("selecting file", files[0], "previous", get(selectedFile));
        selectedFile.set(files[0]);
      } else if (folder.files.find(file => file.id === get(selectedFile)?.id) === null) {
        console.log('Selected file to null')
        selectedFile.set(null);
      }
    });
  });
</script>

<div
  class={css({
    display: "flex",
    flexDir: "column",
    w: "100%",
    bg: "#292b37",
  })}
>
  <div
    class={css({
      py: "2px",
      px: "4px",
      w: "100%",
      color: "text-gray-700",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
    })}
  >
    <span>Files</span>

    <button
      on:click={createFile}
      class={css({
        _hover: { bg: "gray.700" },
        py: "0.1rem",
        px: "0.2rem",
        cursor: "pointer",
        borderRadius: "0.4rem",
        ml: "auto"
      })}
    >
      <IconAdd />
    </button>
  </div>
  <ul class={css({ mt: "2" })}>
    {#if $selectedFile !== null && files && files.length > 0}
      {#each files as file}
        <li
          class={css({
            cursor: "pointer",
            py: "1",
            px: "4",
            bg: {
              base: $selectedFile.id === file.id ? "#424453" : "",
              _hover: $selectedFile.id === file.id ? "" : "#373947",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
          on:click={() => selectFile(file)}
        >
          <span>{file.name}</span>
          <button
            on:click|stopPropagation={() => deleteFile(file)}
            class={css({
              cursor: "pointer",
            })}
          >
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
        No files found.
      </p>
    {/if}
  </ul>
</div>
