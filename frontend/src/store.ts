import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import { GetAllFolders, GetFolder } from "../wailsjs/go/main/App";
import type { main } from "../wailsjs/go/models";

type FoldersStore = {
  subscribe: Writable<main.Folder[] | null>["subscribe"];
  set: (value: main.Folder[] | null) => void;
  update: (
    updater: (value: main.Folder[] | null) => main.Folder[] | null
  ) => void;
  refresh: () => Promise<void>;
};

export const folders = ((): FoldersStore => {
  const { subscribe, set, update } = writable<main.Folder[]>([]);

  return {
    subscribe,
    set,
    update,
    refresh: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const fetchedFolder = await GetAllFolders();
          folders.set(fetchedFolder);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  };
})();

type FolderStore = {
  subscribe: Writable<main.Folder | null>["subscribe"];
  set: (value: main.Folder | null) => void;
  update: (updater: (value: main.Folder | null) => main.Folder | null) => void;
};

export const selectedFolder = ((): FolderStore => {
  const { subscribe, set, update } = writable<main.Folder>(null);

  return {
    subscribe,
    set,
    update,
  };
})();

folders.subscribe((folders) => {
  console.log('folders updated..')
  if (selectedFolder === null) {
    console.log('selectedFolder === null')
    return;
  } else if (folders === null || folders.length === 0) {
    console.log('folders === null || folders.length === 0')
    selectedFolder.set(null);
  } else if (folders.length > 0 && get(selectedFolder) === null) {
    console.log("init selected folder");
    selectedFolder.set(folders[0]);
  } else {
    console.log("updating selected folder");
    selectedFolder.set(folders.find((f) => f.id === get(selectedFolder).id) ?? null);
  }
});

export const selectedFile: Writable<main.File> = writable(null);

// export const localFilesContent: Writable<Set>;
