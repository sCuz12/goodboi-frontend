import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://164.92.128.233:8000",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default axiosInstance;
