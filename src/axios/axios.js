import axios from "axios";

const Axios = new axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default Axios;