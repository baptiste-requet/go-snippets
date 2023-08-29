<script lang="ts">
  import { css } from "../styled-system/css";
  import type { main } from "wailsjs/go/models";
  import IconClose from "~icons/material-symbols/close";
  import { DeleteFile, UpdateFileName } from "../wailsjs/go/main/App";
  import { folders } from "./store";
  import { tick } from "svelte";

  export let file: main.File;

  function deleteFile(file: main.File) {
    DeleteFile(file.id);
    folders.refresh();
  }

  let editableFile: main.File = null;

  let nameInputRef;

  async function handleDblClickOnFileName(evt: MouseEvent, file: main.File) {
    editableFile = file;
    console.log("File in edit mode", editableFile);

    await tick();

    nameInputRef.focus()
    nameInputRef.select()
  }

  async function handleKeydownOnFileName(evt: KeyboardEvent) {
    if (editableFile === null) return;

    if (evt.key === "Enter") {
      UpdateFileName(editableFile.id, evt.target.outerText);
      await folders.refresh();
      editableFile = null;
    }
  }
</script>

<div
  class={css({ flex: 1 })}
  on:dblclick={(evt) => handleDblClickOnFileName(evt, file)}
  on:keydown={handleKeydownOnFileName}
  on:focus={event => file.id === editableFile?.id ? event.target.select() : null}
  contenteditable={file.id === editableFile?.id}
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
