<script lang="ts">
  import { css } from "../styled-system/css";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { folders, selectedFile } from "./store";
  import { UpdateFileContent } from "../wailsjs/go/main/App";
  import { get } from "svelte/store";

  let fileContent = "";
  let fileExtension = "";
  let isFileContentDirty = false;

  selectedFile.subscribe((selectedFile) => {
    isFileContentDirty = false;
    fileContent = selectedFile?.content || "";
    fileExtension = selectedFile?.extension || ""
    console.log('file extension:', fileExtension )
  });

  async function saveFile() {
    // TODO ctrl+S to save
    const { id } = get(selectedFile);
    await UpdateFileContent(id, fileContent); // todo UpdateFileContent
    isFileContentDirty = false;
    folders.refresh();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      saveFile();
    }
  }

  const extensionToCodeMirrorLang = {
    'js': javascript(),
  }

  // TODO file type
  let codeMirroRef: any;
  function printCodeMirror() {
    if (codeMirroRef) {
      console.log('code mirror ref', codeMirroRef)
    }
  }
</script>

<div
  class={css({
    flex: 1,
    display: "flex",
    flexDir: "column",
    minHeight: 0,
    minWidth: 0,
  })}
  on:keydown={handleKeyDown}
>
  {#if $selectedFile === null}
    <div
      class={css({
        py: "0.4rem",
        px: "0.8rem",
        w: "100%",
        color: "text-gray-700",
        fontWeight: "bold",
      })}
    />
  {:else}
    <div
      class={css({
        py: "0.4rem",
        px: "0.8rem",
        w: "100%",
        color: "gray.300",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      
      <button
        on:click={saveFile}
        class={css({
          bg: {
            base: "blue.500",
            _hover: "blue.700",
            _disabled: "gray.500"
          },
          color: "white",
          fontWeight: "bold",
          pt: "2",
          pb: "2",
          pl: "4",
          pr: "4",
          ml: "auto",
          rounded: "rounded",
          cursor: isFileContentDirty ? "pointer" : "",
          borderRadius: "0.4rem",
        })}
        disabled={!isFileContentDirty}
      >
        Save
      </button>
    </div>

    <CodeMirror
      bind:value={fileContent}
      bind:this={codeMirroRef}
      on:click={(event) => console.log("custom event", event)}
      on:change={(event) => {
        console.log('change event', event)
        printCodeMirror()
      isFileContentDirty = true}}
      class={css({
        maxHeight: "100%",
        flex: 1,
        overflow: "auto",
      })}
      theme={oneDark}
      lang={extensionToCodeMirrorLang[fileExtension]}
      styles={{
        "&": {
          maxWidth: "100%",
          height: "100%",
          maxHeight: "100%",
        },
      }}
    />
  {/if}

  <div class={css({
    py: "0.4rem",
    px: "0.8rem",
    w: "100%",
    color: "text-gray-700",
    bg: "#282c34",
  })}>
    {$selectedFile?.extension ?? 'No extension'}
  </div>

</div>
