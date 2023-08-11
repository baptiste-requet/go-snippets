<script>
  import { css } from "../styled-system/css";

  let folders = [
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" },
  ];

  let selectedFolder = null;

  function selectFolder(folder) {
    selectedFolder = folder;
  }
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
    })}
  >
    Folders
  </div>
  <ul class={css({ mt: "2" })}>
    {#each folders as folder}
      <li
        class={css({
          cursor: "pointer",
          py: "1",
          px: "4",
          bg: { _hover: "#373947" },
        })}
        on:click={() => selectFolder(folder)}
        class:font-bold={folder === selectedFolder}
      >
        {folder.name}
      </li>
    {/each}
  </ul>
</div>
