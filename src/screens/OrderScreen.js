import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "../client/backend";
import dateFormat from "dateformat";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { detailsOrder, payOrder } from "../redux/actions/ordersActions";
import { ORDER_PAY_RESET } from "../redux/constants/ordersContants";

export default function OrderScreen(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderId = props.match.params.id;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=USD&locale=es_EC&disable-funding=mybank,sofort`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className="container py-3 my-5">
      <Helmet>
        <title>{`Cavalieri Suits | ${order._id}`}</title>
        <meta name="description" content="Resumen del estado de su orden" />
      </Helmet>
      <h1 className="mx-lg-5">Orden número: {order._id}</h1>
      <div className="row justify-content-around">
        <div className="col-12 col-lg-5">
          <div className="card card-body my-3 col-12 shadow">
            <div>
              <strong>Nombre:</strong>
              <p>{order.shippingAddress.fullName}</p>
              <strong>Dirección:</strong>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="card card-body my-3 col-12 shadow">
            <div className="row">
              <div className="col-6">
                <strong>Método de Pago:</strong> {order.paymentMethod}
              </div>
            </div>
            <div className="">
              <strong>Artículos en el carrito:</strong>
              <div className="row">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="mx-auto row">
                    <div className="col-8 p-0">{item.name}</div>
                    <div className="col-2 p-0">x {item.qty}</div>
                    <div className="col-2 p-0">
                      {(item.qty * item.price).toFixed(2)}
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card card-body my-3 text-center shadow">
            <h2>Resumen de su compra:</h2>
            <div className="row mb-3">
              <div className="col-6">Artículos:</div>
              <div className="col-6">${order.itemsPrice.toFixed(2)}</div>
              <div className="col-6">Costos de envío:</div>
              <div className="col-6">${order.shippingPrice.toFixed(2)}</div>
              <div className="col-6">Impuestos:</div>
              <div className="col-6">${order.taxPrice.toFixed(2)}</div>
              <div className="col-6">
                <strong>Total a Pagar:</strong>
              </div>
              <div className="col-6">
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            {!order.isPaid &&
              currentUser._id === order.user.id &&
              (!sdkReady ? (
                <Loading />
              ) : (
                <div className="col-6 align-self-center mt-4">
                  {errorPay && (
                    <span className="badge bg-warning">{errorPay}</span>
                  )}
                  {loadingPay && <Loading />}
                  <PayPalButton
                    amount={order.totalPrice.toFixed(2)}
                    onSuccess={successPaymentHandler}
                  />
                </div>
              ))}
            <div className="row mx-auto justify-content-around">
              <div className="col-6">
                {order.isPaid ? (
                  <span className="badge bg-success">
                    Pago completado {dateFormat(order.paidAt, "dd/mm/yy")}
                  </span>
                ) : (
                  <span className="badge bg-danger">Pago pendiente</span>
                )}
              </div>
              <div className="col-6">
                {order.isDelivered ? (
                  <span className="badge bg-success">
                    Orden entregada {dateFormat(order.deliveredAt, "dd/mm/yy")}
                  </span>
                ) : (
                  <span className="badge bg-primary">Entrega pendiente</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
