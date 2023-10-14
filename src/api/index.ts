import axios from "axios";
import { apiKey } from "./apiKey";

const axiosInstance = axios.create({
  baseURL: "https://partners.every.org/v0.2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.params = {};
axiosInstance.defaults.params["apiKey"] = apiKey;

export default axiosInstance;
