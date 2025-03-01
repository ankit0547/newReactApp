import axiosInstance from "./axios.jsx";

export const invokeApi = async (
  action,
  data = null,
  params = {},
  config = {}
) => {
  let response;

  if (Object.keys(params).length > 0) {
    // Store the original endpoint to prevent mutations
    let endpoint = action.originalEndpoint || action.endpoint;

    // Replace placeholders in the endpoint (e.g., :resetToken)
    Object.keys(params).forEach((key) => {
      endpoint = endpoint.replace(`:${key}`, params[key]);
    });

    // Store the modified endpoint separately
    action.modifiedEndpoint = endpoint;
  }

  try {
    switch (action.method) {
      case "POST":
        response = await axiosInstance.post(
          action.modifiedEndpoint || action.endpoint,
          data,
          config
        );

        break;
      case "GET":
        response = await axiosInstance.get(
          action.modifiedEndpoint || action.endpoint,
          data,
          config
        );
        break;

      default:
        break;
    }
    return response; // Returning the response data
  } catch (error) {
    // You can customize error handling here if needed
    console.error("API request error:", error);
    throw error; // Re-throw the error for further handling in the calling component
  }
};
