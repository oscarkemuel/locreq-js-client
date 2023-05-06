import { useAuthStore } from "@/store/auth";

export const checkUserAuthenticated = () => {
  const userToken = useAuthStore.getState().state.token;

  return !!userToken;
}