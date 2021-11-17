import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import {
  removeCartItems,
  removeShippingAddress,
} from "../redux/actions/cartActions";
import { ORDER_CREATE_RESET } from "../redux/constants/ordersContants";

export default function Error({ error }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUserInfo());
    dispatch(removeCartItems());
    dispatch(removeShippingAddress());
    dispatch({ type: ORDER_CREATE_RESET });
    history.push("/login");
  };
  return (
    <div
      className="alert alert-danger container text-center col-4 col-md-3 my-5"
      role="alert"
    >
      {error}
      <br />
      <Button className="mt-3" variant="light" onClick={logoutHandler}>
        Iniciar sesión
      </Button>
    </div>
  );
}
