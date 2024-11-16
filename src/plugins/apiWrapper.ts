import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
console.log("import.meta.env.MODE", import.meta.env.MODE)

const baseURL = isDevelopment ? "/api" : import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: window.location.origin,
  },
})

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
