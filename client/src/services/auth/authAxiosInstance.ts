import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default authAxiosInstance;
