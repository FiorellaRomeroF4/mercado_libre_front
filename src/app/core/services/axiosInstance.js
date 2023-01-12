import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://localhos:8000/api",
});
