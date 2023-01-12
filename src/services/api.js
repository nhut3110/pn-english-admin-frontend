import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  // async (err) => {
  //   const originalConfig = err.config;

  //   if (originalConfig.url !== "/accounts/login" && err.response) {
  //     // Access Token was expired
  //     if (err.response.status === 403 && !originalConfig._retry) {
  //       originalConfig._retry = true;
  //       try {
  //         const rs = await instance.post("/accounts/refresh", {
  //           id: TokenService.getUserID(),
  //           token: TokenService.getLocalAccessToken(),
  //         });

  //         TokenService.updateLocalAccessToken(rs.response.token);

  //         return instance(originalConfig);
  //       } catch (_error) {
  //         return Promise.reject(_error);
  //       }
  //     }
  //   }

  //   return Promise.reject(err);
  // }
);

export default instance;
