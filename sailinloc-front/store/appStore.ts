// store/appStore.ts
import { create } from "zustand";

interface AppState {
  userData: any;
  setUserData: (data: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));
