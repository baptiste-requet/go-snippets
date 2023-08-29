<script lang="ts">
  import { tick } from "svelte";
  import type { main } from "wailsjs/go/models";
  import IconClose from "~icons/material-symbols/close";
  import { css } from "../styled-system/css";
  import { DeleteFile, UpdateFileName } from "../wailsjs/go/main/App";
  import { folders } from "./store";

  export let file: main.File;

  function deleteFile(file: main.File) {
    DeleteFile(file.id);
    folders.refresh();
  }

  let isInEdition = false;

  let nameInputRef: HTMLDivElement | null;

  async function handleDblClickOnFileName() {
    isInEdition = true;

    await tick();

    nameInputRef.focus();

    // Select all text in the div element
    let range = document.createRange();
    range.selectNodeContents(nameInputRef);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  async function handleBlur() {
    isInEdition = false;
  }

  async function handleKeydownOnFileName(evt: KeyboardEvent) {
    if (isInEdition === false) return;

    if (evt.key === "Enter") {
      evt.preventDefault();
      const newFilename = evt.target['outerText']; // TODO sanitize
      if (newFilename !== "") {
        UpdateFileName(file.id, newFilename);
        await folders.refresh();
      }
      isInEdition = false;
    }
  }
</script>

<div
  class={css({
    flex: 1,
    marginRight: "100px",
  })}
  on:dblclick={handleDblClickOnFileName}
  on:keydown={handleKeydownOnFileName}
  on:blur={handleBlur}
  contenteditable={isInEdition}
  bind:this={nameInputRef}
>
  {file.name}
</div>
<button
  on:click|stopPropagation={() => deleteFile(file)}
  class={css({
    cursor: "pointer",
  })}
>
  <IconClose />
</button>
