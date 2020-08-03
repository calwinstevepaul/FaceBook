import axios from "axios";
const baseURL = "http://localhost:9000";

export const plainApi = axios.create({ baseURL });
export const authApi = axios.create({ baseURL });

authApi.interceptors.request.use((config) => {
    config.headers['token'] = JSON.parse(localStorage.getItem('token'))
    return config;
});
