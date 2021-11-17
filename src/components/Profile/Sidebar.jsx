import React from "react";
import { useEffect } from "react";
import {
  BiHome,
  BiHeart,
  BiDollar,
  BiEnvelope,
  BiStar,
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
    <div className="col-12 col-md-3 px-5 px-md-3 p-4 border-end">
      <div className="row mx-auto my-3 my-md-0">
        <div className="col-6 col-md-12 px-0 px-md-3">
          <h5 className="border-bottom pb-1">Mi Perfil</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <Link className="text-decoration-none text-black" to="/profile">
                <BiHome className="mx-2" />
                Inicio
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/profile/favorites"
              >
                <BiHeart className="mx-2" />
                Favoritos
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/profile/historial"
              >
                <BiDollar className="mx-2" />
                Mis Ordenes
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/profile/messages"
              >
                <BiEnvelope className="mx-2" />
                Chat Support
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/profile/reviews"
              >
                <BiStar className="mx-2" />
                Reviews
              </Link>
            </li>
            <li
              className="my-2"
              onClick={logoutHandler}
              style={{ cursor: "pointer" }}
            >
              <BiLogOut className="mx-2" />
              Cerrar Sesión
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
