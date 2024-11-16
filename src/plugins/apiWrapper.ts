import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"

const baseURL = isDevelopment ? "/api" : "/api"

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", config)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      window.location.href = "/404"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
