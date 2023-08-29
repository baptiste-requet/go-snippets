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
  refresh: () => void;
};

export const folders = ((): FoldersStore => {
  const { subscribe, set, update } = writable<main.Folder[]>([]);

  const a = subscribe((v) => v);

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

  const foldersSubs = folders.subscribe((folders) => {
    if (folders === null || folders.length === 0 || get(selectedFolder) === null) {
      return;
    }
    console.log("updating selected folder")
    selectedFolder.update(v => folders.find(f => f.id === get(selectedFolder).id));
  });

  return {
    subscribe,
    set,
    update
  };
})();

export const selectedFile: Writable<main.File> = writable(null);



// export const localFilesContent: Writable<Set>;
