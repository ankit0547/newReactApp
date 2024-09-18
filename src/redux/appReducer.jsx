const initialState = {
  processing: false,
  singleServerError: [],
  multipleServerError: [],
  isAppUnderMaintainence: false,
};

const ApplicationState = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_PROCESSING_START":
      return { ...state, processing: action.payload };
    case "REQUEST_PROCESSING_END":
      return { ...state, processing: action.payload };
    default:
      return state;
  }
};

export default ApplicationState;
