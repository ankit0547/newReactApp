import axiosInstance from "./axios.jsx";
import { apiConstants } from "./constants";

export const invokeApi = async (
  action,
  data = null,
  params = {},
  config = {}
) => {
  let response;
  let filteredAction = apiConstants.find((obj) => obj.actionType === action);
  if (!filteredAction) {
    throw new Error(`Action type "${action}" not found in apiConstants`);
  }

  if (Object.keys(params).length > 0) {
    // Store the original endpoint to prevent mutations
    let endpoint = filteredAction.originalEndpoint || filteredAction.endpoint;

    // Replace placeholders in the endpoint (e.g., :resetToken)
    Object.keys(params).forEach((key) => {
      endpoint = endpoint.replace(`:${key}`, params[key]);
    });

    // Store the modified endpoint separately
    filteredAction.modifiedEndpoint = endpoint;
  }

  try {
    switch (filteredAction.method) {
      case "POST":
        response = await axiosInstance.post(
          filteredAction.modifiedEndpoint || filteredAction.endpoint,
          data,
          config
        );

        break;
      case "GET":
        response = await axiosInstance.get(
          filteredAction.modifiedEndpoint || filteredAction.endpoint,
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
