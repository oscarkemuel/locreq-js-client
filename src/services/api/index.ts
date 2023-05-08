import { AuthAPI } from "./urls/auth";
import { CustomerAPI } from "./urls/customer";
import { SellerAPI } from "./urls/seller";
import { UserAPI } from "./urls/user";

export const api = {
  auth: new AuthAPI(),
  user: new UserAPI(),
  customer: new CustomerAPI(),
  seller: new SellerAPI(),
}

export default api;