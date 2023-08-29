<script lang="ts">
  import { css } from "../styled-system/css";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { folders, selectedFile } from "./store";
  import { UpdateFile } from "../wailsjs/go/main/App";
  import { get } from "svelte/store";

  let fileContent: string = "";
  selectedFile.subscribe(
    (selectedFile) => (fileContent = selectedFile?.content || "")
  );

  async function saveFile() {
    const { id, name, extension, folderId } = get(selectedFile);
    await UpdateFile(id, name, extension, fileContent, folderId);
    folders.refresh();
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
    File Content (title)

    <button on:click={saveFile}> Save </button>
  </div>

  <CodeMirror
    bind:value={fileContent}
    class={css({
      maxHeight: "100%",
      flex: 1,
      overflow: "auto",
    })}
    theme={oneDark}
    lang={javascript()}
    styles={{
      "&": {
        maxWidth: "100%",
        height: "100%",
        maxHeight: "100%",
      },
    }}
  />
</div>
