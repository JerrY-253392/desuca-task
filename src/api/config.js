import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export function setupAxios() {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    axios.interceptors.request.use((config) => {
        const changedConfig = config;
        const token = secureLocalStorage.getItem("token");
        if (token && config.headers) {
          changedConfig.headers.Authorization = `Bearer ${token}`;
        }
    
        return changedConfig;
      });
}