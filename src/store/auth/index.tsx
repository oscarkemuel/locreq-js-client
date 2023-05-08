import api from "@/services/api";
import { IUser } from "@/services/api/urls/auth/types";
import { create } from "zustand";

type ActionsProps = {
  login: (token: string, user: IUser) => void;
  logOut: () => void;
  getToken: () => string | null;
  updateUserInfo: () => void;
};

type StoreProps = {
  state: {
    user: IUser | null;
    token: string | null;
  };
  actions: ActionsProps;
};

const userTokenKey = "@entrega-system:token";

export const useAuthStore = create<StoreProps>((set, get) => {
  return {
    state: {
      user: null,
      token: null,
    },
    actions: {
      login: (token, user) => {
        localStorage.setItem(userTokenKey, token);
        set({ state: { user, token } });
      },
      logOut: () => {
        localStorage.removeItem(userTokenKey);
        set({ state: { user: null, token: null } });
      },
      getToken: () => {
        if (typeof window === "undefined") {
          return null;
        }

        return localStorage.getItem(userTokenKey);
      },
      updateUserInfo: async () => {
        const {
          data: {
            user: { user, token },
          },
        } = await api.auth.getUserByToken();

        set({ state: { user, token } });
      },
    },
  };
});
