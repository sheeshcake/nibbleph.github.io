import axios from "axios";
import API_URL from "../api/api";
import { USER } from "./userConstants";
import { getLocalStorageItem } from "./getLocalStorage";
import { setLocalStorageItem } from "./setLocalStorageItem";

export class Api {
  axiosInstance = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalStorageItem(USER.ACCESS_TOKEN)}`,
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getLocalStorageItem(USER.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        try {
          const response = error;
          console.log(response);
          if (error.response.status === 401) {
             setLocalStorageItem(USER.ACCESS_TOKEN,'')
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
          } else {
            return Promise.reject(error);
          }
        } catch (error) {
          console.error(error);
        }

        throw error;
      }
    );
  }

  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios() {
    return Api.getInstance().axiosInstance;
  }

  static get(url, params, config) {
    return Api.getAxios().get(url, { params, ...config });
  }

  static post(url, data, config) {
    return Api.getAxios().post(url, data, config);
  }

  static delete(url, params = {}, config = {}) {
    return Api.getAxios().delete(url, { params, ...config });
  }
}

export default Api;
