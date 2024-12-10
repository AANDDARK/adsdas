import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminStore = {
  adminState: boolean;
  setAdminState: (state: boolean) => void;
};

export const useAdminStore = create(
  persist<AdminStore>(
    (set) => ({
      adminState: false, // Початкове значення
      setAdminState: (state) => set({ adminState: state }), 
    }),
    {
      name: "admin-storage", 
      storage: {
        getItem: (key) => {
          const storedValue = sessionStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key); 
        },
      },
    }
  )
);
