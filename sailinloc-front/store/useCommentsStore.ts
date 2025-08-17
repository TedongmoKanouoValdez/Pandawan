// store/useCommentsStore.ts
import { create } from "zustand";

export const useCommentsStore = create((set) => ({
  bateauId: "",
  utilisateurId: "",
  setData: (bateauId: string, utilisateurId: string) =>
    set({ bateauId, utilisateurId }),
}));
