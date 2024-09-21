import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface useEditorToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useEditorToggle = create(
  persist<useEditorToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: "editorOpen",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
