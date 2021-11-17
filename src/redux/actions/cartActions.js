import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItems = () => (dispatch) => {
  localStorage.removeItem("cart");
  dispatch({ type: actionTypes.REMOVE_CART_ITEMS, payload: [] });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const removeShippingAddress = () => (dispatch) => {
  dispatch({ type: actionTypes.CART_REMOVE_SHIPPING_ADDRESS, payload: {} });
  localStorage.removeItem("shippingAddress");
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_PAYMENT_METHOD, payload: data });
};
