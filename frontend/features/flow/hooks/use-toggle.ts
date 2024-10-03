import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ToggleStore {
  isCodeEditorOpen: boolean;
  isFlowOpen: boolean;
  isSidebarOpen: boolean;
  isVisualizationOpen: boolean;

  toggleCodeEditor: () => void;
  toggleFlow: () => void;
  toggleSidebar: () => void;
  toggleVisualization: () => void;
}

export const useToggle = create(
  persist<ToggleStore>(
    (set, get) => ({
      isCodeEditorOpen: true,
      isFlowOpen: true,
      isSidebarOpen: true,
      isVisualizationOpen: true,

      toggleCodeEditor: () => {
        set({ isCodeEditorOpen: !get().isCodeEditorOpen });
      },
      toggleFlow: () => {
        set({ isFlowOpen: !get().isFlowOpen });
      },
      toggleSidebar: () => {
        set({ isSidebarOpen: !get().isSidebarOpen });
      },
      toggleVisualization: () => {
        set({ isVisualizationOpen: !get().isVisualizationOpen });
      },
    }),
    {
      name: "toggleStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
