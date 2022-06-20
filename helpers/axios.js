import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://api.www.goodboi.com.cy:8000",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default axiosInstance;
