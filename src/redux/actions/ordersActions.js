import axios from "../../client/backend";
import * as actionTypes from "../constants/ordersContants";
import { REMOVE_CART_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: actionTypes.ORDER_CREATE_REQUEST, payload: order });
  try {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: REMOVE_CART_ITEMS, payload: [] });
  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch) => {
  dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST, payload: orderId });
  const token = localStorage.getItem("authToken");
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: actionTypes.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (dispatch) => {
  dispatch({
    type: actionTypes.ORDER_PAY_REQUEST,
    payload: { order, paymentResult },
  });
  const token = localStorage.getItem("authToken");
  try {
    const { data } = await axios.put(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: actionTypes.ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.ORDER_PAY_FAIL, payload: message });
  }
};

export const listOrderMine = () => async (dispatch) => {
  dispatch({ type: actionTypes.ORDER_MINE_LIST_REQUEST });
  const token = localStorage.getItem("authToken");
  try {
    const { data } = await axios.get("/api/orders/history/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = "Su sesión ha caducado";
    // error.response && error.response.data.message
    //   ? error.response.data.message
    //   : error.message;
    dispatch({ type: actionTypes.ORDER_MINE_LIST_FAIL, payload: message });
  }
};
