import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jobs-api.squareboat.info/api/v1/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
