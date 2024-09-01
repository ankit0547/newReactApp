import { axiosInstance } from "./axios";
import { apiConstants } from "./constants";

export const invokeApi = async (action, data = null, config = {}) => {
  const result = await apiCall(action, data, config);
  return result;
};

export const apiCall = (action, data = null, config = {}) => {
  const filteredAction = apiConstants.filter(
    (obj) => obj.actionType === action
  )[0];
  let response;
  try {
    switch (filteredAction.method) {
      case "POST":
        response = axiosInstance.post(filteredAction.endpoint, data, config);

        break;
      case "GET":
        response = axiosInstance.get(filteredAction.endpoint, data, config);
        break;

      default:
        break;
    }
    // response.then((rs) => {
    //   console.log("Login submitted:", rs);
    // });
    return response; // Returning the response data
  } catch (error) {
    // You can customize error handling here if needed
    console.error("API request error:", error);
    throw error; // Re-throw the error for further handling in the calling component
  }
};

export default invokeApi;
