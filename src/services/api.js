// Api configurations here * * connects directly with the backend....
import axios from "axios";
import { appUrls } from "./urls";

let URL = import.meta.env.VITE_BASE_URL;

const apiResource = () => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": URL,
      "Access-Control-Allow-Credentials": true,
    },
  });
  api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (!token) return config;
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    async (error) => {
      const originalConfig = error.config;
      // console.log(originalConfig);
      if (
        error?.response?.status === 403 ||
        originalConfig.url !== appUrls.LOGIN_URL ||
        originalConfig.url !== appUrls.GETSINGLEWORKERDETAILS_URL
      ) {
        sessionStorage.clear();
        // window.location = "/login";
      } else if (error?.response?.status === 401) {
        if (
          originalConfig.url !== appUrls.LOGIN_URL ||
          (originalConfig.url !== appUrls.GETSINGLEWORKERDETAILS_URL &&
            error?.response)
        ) {
          // call refresh token once accesstoken has expired...
          if (error.response.status === 400 && !originalConfig._retry) {
            originalConfig._retry = true;
            const refreshToken = sessionStorage.getItem("refreshToken");
            const userObj = JSON.parse(sessionStorage.getItem("userObj"));
            const payload = {
              userId: userObj?.id,
              refreshToken,
            };
            try {
              const rs = await api.post(appUrls.REFRESHTOKEN_URL, payload);
              if (rs?.status === 200) {
                sessionStorage.setItem("token", rs?.data?.data?.newAccessToken);
                sessionStorage.setItem(
                  "refreshToken",
                  rs?.data?.data?.newRefreshToken
                );
              }
              return api(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error?.response);
        });
      }
      return Promise.reject(error?.response);
    }
  );
  return api;
};

export const api = apiResource();
