import { AuthAPI } from "./urls/auth";
import { UserAPI } from "./urls/user";

export const api = {
  auth: new AuthAPI(),
  user: new UserAPI(),
}

export default api;