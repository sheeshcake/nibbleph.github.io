import Api from "../../src/utils/ApiRequest";
import Cookies from "js-cookie";

const routes = {
  login: async (data) => {
    return await Api.post(`/auth/login`, data).then((r) => {
      // Cookies.set("token", r.data.token);
      return r.data;
    });
  },
  logout: async (data) => {
    return await Api.post(`/auth/logout`, data).then((r) => {
      // Cookies.set("token", r.data.token);
      return r.data;
    });
  },
  register: async (data) => {
    return await Api.post(`/auth/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.data);
  },

  fetchCountry: async (data) =>{
    return await Api.get(`/fetch-countries`).then((r) => r.data)
  },

  verifyEmail: async (data) =>{
    return await Api.post(`/auth/verify-email`,data,{
      headers: {
        "Content-Type" : "application/json",
      },

    }).then((r) => r.data)
  },
  forgotPassword: async(data) =>{
    return await Api.post(`/auth/send-reset`,data,{
      headers: {
        "Content-Type" : "application/json",
      },
    }).then((r) =>r.data)
  },

  newPassword: async(data) =>{
    return await Api.post(`/auth/reset-password`,data,{
      headers: {
        "Content-Type": "application/json"
      },
    }).then((r) =>r.data)
  },

  fetchAssignableUsers: async() =>{
    return await Api.get(`/admin/user/role`).then((r) =>r.data)
  }
};

export default routes;
