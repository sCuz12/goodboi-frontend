import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://api.goodboi.com.cy",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default axiosInstance;
