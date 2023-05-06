import { create } from "zustand";

type ActionsProps = {
  setToken: (token: string) => void;
  getToken: () => string;
};

type StoreProps = {
  state: {
    token: string;
  };
  actions: ActionsProps;
};

export const useAuthStore = create<StoreProps>((set) => {
  return {
    state: {
      token: "",
    },
    actions: {
      setToken: (token) => {
        set(() => ({ state: { token } }))
        localStorage.setItem("userToken", token);
      },
      getToken: () => {
        const token = localStorage.getItem("userToken");
        if (token) {
          set(() => ({ state: { token } }));
          return token;
        }
        return "";
      }
    },
  };
})
