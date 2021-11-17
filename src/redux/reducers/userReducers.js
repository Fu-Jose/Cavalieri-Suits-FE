import * as actionTypes from "../constants/userConstants";

export const getUserInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      return { user: action.payload };
    case actionTypes.GET_USER_INFO_FAIL:
      return { user: {}, error: action.payload };
    case actionTypes.REMOVE_USER_INFO:
      return { user: {} };
    default:
      return state;
  }
};
