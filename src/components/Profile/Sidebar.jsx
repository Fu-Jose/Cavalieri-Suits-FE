import React from "react";
import { useEffect } from "react";
import {
  BiHeart,
  BiDollar,
  BiEnvelope,
  BiLogOut,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeUserInfo } from "../../redux/actions/userActions";
import {
  removeCartItems,
  removeShippingAddress,
} from "../../redux/actions/cartActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/ordersContants";

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);

  const logoutHandler = () => {
    dispatch(removeCartItems());
    dispatch(removeUserInfo());
    dispatch(removeShippingAddress());
    dispatch({ type: ORDER_CREATE_RESET });
    history.push("/login");
  };
  return (
    <div className="row col-md-2 mx-auto py-3 text-center fs-6">
      <div className="col col-md-12 align-self-center">
        <Link
          className="text-decoration-none text-black"
          to="/profile/favorites"
        >
          <div>
            <BiHeart className="mx-2" />
            <br />
            Favoritos
          </div>
        </Link>
      </div>
      <div className="col col-md-12 align-self-center">
        <Link
          className="text-decoration-none text-black"
          to="/profile/historial"
        >
          <div>
            <BiDollar className="mx-2" />
            <br />
            Ordenes
          </div>
        </Link>
      </div>
      <div className="col col-md-12 align-self-center">
        <Link
          className="text-decoration-none text-black"
          to="/profile/messages"
        >
          <div>
            <BiEnvelope className="mx-2" />
            <br />
            Mensajes
          </div>
        </Link>
      </div>
      <div
        className="col col-md-12 align-self-center"
        onClick={logoutHandler}
        style={{ cursor: "pointer" }}
      >
        <BiLogOut className="mx-2" />
        <br />
        Salir
      </div>
    </div>
  );
}
