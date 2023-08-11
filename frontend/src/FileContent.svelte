<script lang="ts">
  import { css } from "../styled-system/css";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";

  let selectedFile = 1;

  // Sample file contents
  let fileContents = [
    {
      fileId: 1,
      content: "This is the content of File 1",
    },
    {
      fileId: 2,
      content: "This is the content of File 2",
    },
    {
      fileId: 3,
      content: "This is the content of File 3",
    },
  ];

  $: selectedFileContent =
    fileContents.find((file) => file.fileId === selectedFile)?.content || "";

  let value = "blabla".repeat(50) + "blabla\n".repeat(50);
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
  </div>
  
  <CodeMirror
    bind:value
    class={css({
      maxHeight: "100%",
      flex: 1,
      overflow: "auto"
    })}
    theme={oneDark}
    lang={javascript()}
    styles={{
      '&': {
          maxWidth: '100%',
          height: '100%',
          maxHeight: '100%',
      },
  }}
  />
</div>