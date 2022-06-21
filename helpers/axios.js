import axios from "axios";
//https://api.goodboi.com.cy
const axiosInstance = axios.create({
  baseURL: "https://api.goodboi.com.cy",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
