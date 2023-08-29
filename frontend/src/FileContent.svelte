<script lang="ts">
  import { css } from "../styled-system/css";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { selectedFile } from "./store";

  let fileContent: string = "";
  selectedFile.subscribe(selectedFile => fileContent = selectedFile?.content || "")

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
    value={fileContent}
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