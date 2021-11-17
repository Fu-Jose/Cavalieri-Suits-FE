import React from "react";
import { useEffect } from "react";
import {
  BiHome,
  BiReceipt,
  BiBarChartSquare,
  BiUser,
  BiStore,
  BiDollar,
  BiEnvelope,
  BiStar,
  BiBriefcaseAlt,
  BiInfoCircle,
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
    <div className="col-12 col-md-2 px-5 px-md-3 py-3 border-end">
      <div className="row mx-auto my-3 my-md-0">
        <div className="col-6 col-md-12 px-0 px-md-3">
          <h5 className="">Administrador</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <Link className="text-decoration-none text-black" to="/admin">
                <BiHome className="mx-2" />
                Inicio
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/stats"
              >
                <BiBarChartSquare className="mx-2" />
                Estadísticas
              </Link>
            </li>
            <li className="my-2">
              <BiReceipt className="mx-2" />
              Ventas
            </li>
          </ul>
        </div>
        <div className="col-6 col-md-12 px-0 px-md-3">
          <h5 className="">Acceso rápido</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/users"
              >
                <BiUser className="mx-2" />
                Usuarios
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/products"
              >
                <BiStore className="mx-2" />
                Productos
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/transactions"
              >
                <BiDollar className="mx-2" />
                Transacciones
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md-12 px-0 px-md-3">
          <h5 className="">Notificaciones</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/messages"
              >
                <BiEnvelope className="mx-2" />
                Mensajes
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="text-decoration-none text-black"
                to="/admin/reviews"
              >
                <BiStar className="mx-2" />
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md-12 px-0 px-md-3">
          <h5 className="">Personal</h5>
          <ul className="list-unstyled">
            <li className="my-2">
              <BiBriefcaseAlt className="mx-2" />
              Turnos
            </li>
            <li className="my-2">
              <BiInfoCircle className="mx-2" />
              Reportes
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
