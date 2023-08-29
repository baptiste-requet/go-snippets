<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { main } from "wailsjs/go/models.js";
  import IconAdd from "~icons/material-symbols/add";
  import { css } from "../styled-system/css";
  import { CreateFile } from "../wailsjs/go/main/App.js";
  import FileEntry from "./FileEntry.svelte";
  import { folders, selectedFile, selectedFolder } from "./store.js";

  let files: main.File[] = [];

  const NEW_FOLDER_DEFAULT_NAME = "Untitled file";

  function selectFile(file) {
    if (get(selectedFile)?.id !== file.id) {
      selectedFile.set(file);
    }
  }

  async function createFile() {
    await CreateFile(NEW_FOLDER_DEFAULT_NAME, "txt", null, $selectedFolder.id);
    folders.refresh();
  }

  onMount(async () => {
    selectedFolder.subscribe((folder) => {
      if (folder === null) {
        files = [];
        selectedFile.set(null);
        return;
      }

      files = folder.files;

      if (get(selectedFile)?.folderId !== folder.id && files?.length > 0) {
        console.log("selecting file", files[0], "previous", get(selectedFile));
        selectedFile.set(files[0]);
      } else if (
        folder.files.find((file) => file.id === get(selectedFile)?.id) === null
      ) {
        console.log("Selected file to null");
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
        ml: "auto",
      })}
    >
      <IconAdd />
    </button>
  </div>
  <ul class={css({ mt: "2" })}>
    {#if $selectedFile !== null && files.length > 0}
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
          <FileEntry {file} />
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
