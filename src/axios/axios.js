import axios from "axios";

const Axios = new axios.create({
  baseURL: String(import.meta.env.VITE_BASE_URL),
  withCredentials: true,
});
console.log(String(import.meta.env.VITE_BASE_URL));
export default Axios;
