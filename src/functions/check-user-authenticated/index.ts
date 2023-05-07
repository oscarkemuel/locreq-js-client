import { useAuthStore } from "@/store/auth";

export const checkUserAuthenticated = () => {
  const userToken = useAuthStore.getState().actions.getToken();

  return !!userToken;
}