import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getProducts = (category) => async (dispatch) => {
  if (!category) {
    try {
      dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
      console.log(process.env.REACT_APP_REACT_APP_SERVER_URL);
      const { data } = await axios.get(
        `https://cavalieriserver.herokuapp.com/products`
      );
      dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  } else {
    try {
      dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
      const { data } = await axios.get(`/products/categoria/${category}`);
      dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/products/${id}`);
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_DETAILS_RESET,
  });
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
  try {
    const token = localStorage.getItem("authToken");
    const { data } = await axios.post(`/products`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_PRODUCT_FAIL, payload: error.message });
    console.log(error);
  }
};

export const createProductReset = () => (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PRODUCT_RESET });
};
