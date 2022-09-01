import axios, {AxiosInstance} from "axios";

export const backend: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  responseType: 'json',
  withCredentials: false,
})
