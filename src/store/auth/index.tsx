import { create } from "zustand";

type ActionsProps = {
  setToken: (token: string) => void;
  getToken: () => string;
  logOut: () => void;
};

type StoreProps = {
  actions: ActionsProps;
};

export const useAuthStore = create<StoreProps>(() => {
  return {
    actions: {
      setToken: (token) => {
        localStorage.setItem("userToken", token);
      },
      getToken: () => {
        const token = localStorage.getItem("userToken");
        if (!token) return "";
        return token;
      },
      logOut: () => {
        localStorage.removeItem("userToken");
        window.location.reload();
      }
    },
  };
})
