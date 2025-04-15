import axios from "axios";
import cookies from "js-cookie";
import { API, KEY } from "./lib/urls";

const axiosPrivate = axios.create({
  withCredentials: true, // Include credentials (like cookies) with requests
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["Ocp-Apim-Subscription-Key"] = KEY;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: { resolve: (token: any) => void; reject: (error: any) => void }[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosPrivate(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = cookies.get("refreshToken");
        const response = await axios.post(`${API}/account/auth/generate-token`, { refreshToken });
        const { accessToken } = response.data;

        cookies.set("accessToken", accessToken);
        axiosPrivate.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        axiosPrivate.defaults.headers["Ocp-Apim-Subscription-Key"] = KEY;
        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Ocp-Apim-Subscription-Key"] = KEY;
        return axiosPrivate(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

const axiosPublic = axios.create();

axiosPublic.interceptors.request.use(
  async (config) => {
    config.headers["Ocp-Apim-Subscription-Key"] = KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {  axiosPrivate, axiosPublic };
