import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import CurrentUser from "../features/auth/services/me.service";
import { User } from "lucide-react";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  role: string;
  // profil_picture: string | null,

  communeId: string;
};

type CurrentUser = {
  user: User | null;
  isAuthenticate: boolean;
};


type Action = {
     setUser: (user:User) => void,
     clearUser: () => void


}

export const userStore = create<CurrentUser & Action>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticate: false,

      setUser: (user: User) => set({ user: user, isAuthenticate: true }),
      clearUser: () => set({ user: null, isAuthenticate: false }),
      getUser: () => get().user,
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
