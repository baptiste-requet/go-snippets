<script>
  import { css } from "../styled-system/css";

  let files = [
    { id: 1, name: "File 1" },
    { id: 2, name: "File 2" },
    { id: 3, name: "File 3" },
  ];

  let selectedFile = null;

  function selectFile(file) {
    selectedFile = file;
  }
</script>

<div
  class={css({
    display: "flex",
    flexDir: "column",
    w: "100%",
    bg: '#292b37',
  })}
>
  <div
    class={css({
      py: "2px",
      px: "4px",
      color: "text-gray-700",
      fontWeight: "bold",
    })}
  >
    Files
  </div>
  <ul class={css({ mt: "2" })}>
    {#each files as file}
      <li
      class={css({
        cursor: "pointer",
        py: "1",
        px: "4",
        bg: { _hover: "#4a4d5f" },
      })}
        on:click={() => selectFile(file)}
        class:font-bold={file === selectedFile}
      >
        {file.name}
      </li>
    {/each}
  </ul>
</div>
