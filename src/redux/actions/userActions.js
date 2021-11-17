import * as actionTypes from "../constants/userConstants";
import axios from "axios";

export const getUserInfo = (user_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.get(`/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.GET_USER_INFO, payload: data });
  } catch (error) {
    const message = "Su sesión ha caducado.";
    dispatch({ type: actionTypes.GET_USER_INFO_FAIL, payload: message });
  }
};

export const removeUserInfo = () => async (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({
    type: actionTypes.REMOVE_USER_INFO,
  });
};
