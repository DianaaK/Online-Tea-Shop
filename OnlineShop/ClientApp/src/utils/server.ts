import axios, { AxiosRequestConfig, Method } from "axios";
import { store } from "../redux/configureStore";
import { AuthActionTypes } from "../redux/authentication";

const defOrigin = "https://localhost:5001/api";

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.warn("Network error - Please check API");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    console.warn("Item not found");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    console.warn("Item not found");
  }
  if (status === 500) {
    console.warn("Server error - check terminal");
  }
});

class Server {
  origin?: string;

  constructor() {
    this.origin = defOrigin;
  }

  get(url: string, data: any = null) {
    return this.call("get", url, data);
  }

  post(url: string, data: any) {
    return this.call("post", url, data);
  }

  put(url: string, data: any) {
    return this.call("put", url, data);
  }

  delete(url: string, data?: any) {
    return this.call("delete", url, data);
  }

  login(email: string, password: string) {
    return this.post("auth/login", { Email: email, Password: password })
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {
        throw (
          (error.response.data && error.response.data.ERROR) ||
          error.response.data
        );
      });
  }

  call(method: Method, url: string, data: any) {
    const axiosRequest = this.getMetadata(method, url, data);

    return new Promise((resolve, reject) => {
      axios
        .request(axiosRequest)
        .then((result: any) => resolve(result))
        .catch((err: any) => {
          const parsedError = this.handleError(err);
          if (parsedError) {
            reject(parsedError);
          } else {
            console.log("Session expired!");
          }
        });
    });
  }

  getMetadata(method: Method, url: string, data: any) {
    const state = store.getState();
    let token = "";
    if (state && state.auth && state.auth && state.auth.token) {
      token = state.auth.token.token;
    }
    let axiosRequest: AxiosRequestConfig = {};
    axiosRequest = {
      baseURL: `${this.origin}/${url}`,
      method,
      data,
    };
    if (method === "post") {
      axiosRequest.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    return axiosRequest;
  }

  handleError(err: any) {
    const { response } = err;
    if (!response) {
      console.warn("Server error", err);
      return err;
    }
    const { data } = err.response;
    if (
      data.message === "jwt expired" ||
      data.message === "invalid signature"
    ) {
      store.dispatch({ type: AuthActionTypes.LOGOUT });
      return null;
    }
    return err;
  }

  errorParse(error: any) {
    const response = (error && error.response) || error || {};
    const data = response.data || response;
    return data.ERROR || data;
  }
}

export default new Server();
