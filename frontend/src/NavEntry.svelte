<script lang="ts">
  import { tick } from "svelte";
  import IconClose from "~icons/material-symbols/close";
  import { css } from "../styled-system/css";
  import type { main } from "../wailsjs/go/models";

  export let entry: main.File | main.Folder;

  export let deleteEntry: (id: number) => void;

  export let updateEntryName: (id: number, newEntryName: string) => Promise<void>;

  let isInEdition = false;
  let inputEntryName: string;

  let nameInputRef: HTMLDivElement;

  async function handleDblClickOnFileName() {
    inputEntryName = entry.name;
    isInEdition = true;

    await tick();

    nameInputRef.focus();
  }

  function handleBlur() {
    isInEdition = false;
  }

  function handleInputFocus(event: any) {
    event.target.select();
  }

  async function handleKeydownOnFileName(event: KeyboardEvent) {
    if (isInEdition === false) return;

    if (event.key === "Enter") {
      event.preventDefault();
      if (inputEntryName !== "" && inputEntryName !== entry.name) {
        await updateEntryName(entry.id, inputEntryName);
      }
      isInEdition = false;
    }
  }
</script>

{#if isInEdition}
  <input
    class={css({
      flex: 1,
      marginRight: "1rem",
      bg: "#252a32",
      color: "white"
    })}
    on:blur={handleBlur}
    on:keydown={handleKeydownOnFileName}
    on:focus={handleInputFocus}
    bind:this={nameInputRef}
    bind:value={inputEntryName}
  />
{:else}
  <div
    class={css({
      flex: 1,
      marginRight: "1rem",
      ml: "0.5rem"
    })}
    on:dblclick={handleDblClickOnFileName}
  >
    {entry.name}
  </div>
{/if}

<button
  on:click|stopPropagation={() => deleteEntry(entry.id)}
  class={css({
    cursor: "pointer",
  })}
>
  <IconClose />
</button>
