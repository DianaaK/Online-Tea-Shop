import { store } from "../redux/configureStore";

class AuthUtils {
  isAdmin = () => {
    const auth = store.getState().auth;
    return auth.token && auth.token.type === "Admin";
  };

  isUser = () => {
    const auth = store.getState().auth;
    return auth.token && auth.token.type === "Customer";
  };
}

export default new AuthUtils();
