import axios from "axios";

const backend = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

export default backend;
