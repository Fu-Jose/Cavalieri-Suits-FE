import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps(props) {
  return (
    <div className="row col-12 mx-auto fs-6">
      <div
        className={
          props.step1
            ? "fw-bold col-3 text-center text-white bg-dark"
            : "fw-light col-3 text-center"
        }
      >
        <Link
          className={
            props.step1
              ? "text-decoration-none text-white"
              : "text-decoration-none text-dark"
          }
          to={props.step1 ? "/login" : "#"}
        >
          Iniciar sesión
        </Link>
      </div>
      <div
        className={
          props.step2
            ? "fw-bold col-3 text-center text-white bg-dark"
            : "fw-light col-3 text-center"
        }
      >
        <Link
          className={
            props.step2
              ? "text-decoration-none text-white"
              : "text-decoration-none text-dark"
          }
          to={props.step2 ? "/shipping" : "#"}
        >
          Dirección envío
        </Link>
      </div>
      <div
        className={
          props.step3
            ? "fw-bold col-3 text-center text-white bg-dark"
            : "fw-light col-3 text-center"
        }
      >
        <Link
          className={
            props.step3
              ? "text-decoration-none text-white"
              : "text-decoration-none text-dark"
          }
          to={props.step3 ? "/payment" : "#"}
        >
          Método de Pago
        </Link>
      </div>
      <div
        className={
          props.step4
            ? "fw-bold col-3 text-center text-white bg-dark"
            : "fw-light col-3 text-center"
        }
      >
        <Link
          className={
            props.step4
              ? "text-decoration-none text-white"
              : "text-decoration-none text-dark"
          }
          to={props.step4 ? "/placeorder" : "#"}
        >
          Confirmar orden
        </Link>
      </div>
    </div>
  );
}
