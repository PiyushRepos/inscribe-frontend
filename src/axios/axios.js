import axios from "axios";

const Axios = new axios.create({
  baseURL: String(import.meta.env.VITE_BASE_URL),
  withCredentials: true,
});

export default Axios;