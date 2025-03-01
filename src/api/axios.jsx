// src/utils/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Replace with your API base URL
  timeout: 10000, // Set a timeout limit
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx will cause this function to trigger
    return { data: response.data.data, status: response.status };
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 400:
          console.error("Bad Request:", error.response.data);
          break;
        case 401:
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const apiEndpoint = import.meta.env.VITE_APP_API_URL;
              const endPoint = `${apiEndpoint}/user/refresh-token`;
              const refreshToken = localStorage.getItem("refreshToken");
              const response = await axios.post(endPoint, { refreshToken });
              const newAccessToken = response.data.data.accessToken;
              const newRefreshToken = response.data.data.refreshToken;
              localStorage.setItem("accessToken", newAccessToken);
              localStorage.setItem("refreshToken", newRefreshToken);
              // Set the new access token in the original request headers
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              // Retry the original request with the new access token
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.error("Refresh token expired or invalid:", refreshError);
              // Optionally, handle logout or redirect to login
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
            }
          }
          break;
        case 403:
          console.error("Forbidden:", error.response.data);
          break;
        case 404:
          console.error("Not Found:", error.response.data);
          break;
        case 500:
          console.error("Internal Server Error:", error.response.data);
          break;
        default:
          console.error("Unhandled error:", error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in request setup:", error.message);
    }

    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default axiosInstance;
