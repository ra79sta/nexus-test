import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL as string

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
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
