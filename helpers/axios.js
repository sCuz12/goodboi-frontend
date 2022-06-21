import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api.goodboi.com.cy",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default axiosInstance;
