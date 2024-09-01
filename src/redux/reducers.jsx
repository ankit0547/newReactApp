const initialState = {
  processing: false,
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENTY":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENTY":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default counterReducer;
