import axios from "axios";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API URL
  timeout: 10000, // Optional: request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken").toString();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // eslint-disable-next-line no-debugger
    debugger;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    // Parse or transform the response data here
    if (response.data) {
      // Example: Extract specific fields or modify response
      return {
        data: response.data.data,
        status: response.status,
        // headers: response.headers,
      };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/api/refresh-token", {
          refreshToken,
        });

        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);

        // Set the new access token in the original request headers
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);
        // Optionally, handle logout or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
