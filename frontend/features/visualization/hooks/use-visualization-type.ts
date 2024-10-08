import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface VisualizationTypeStore {
  visualizationType: "table" | "line" | "bar";
  setVisualizationType: (_visualizationType: "table" | "line" | "bar") => void;
}

export const useVisualizationType = create(
  persist<VisualizationTypeStore>(
    (set) => ({
      visualizationType: "table",
      setVisualizationType: (_visualizationType: "table" | "line" | "bar") => {
        set({ visualizationType: _visualizationType });
      },
    }),
    {
      name: "visualizationTypeStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
