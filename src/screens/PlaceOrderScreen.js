import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CheckoutSteps from "../components/Checkout/Checkout";
import Loading from "../components/Loading";
import { Button } from "react-bootstrap";
import { createOrder } from "../redux/actions/ordersActions";
import { ORDER_CREATE_RESET } from "../redux/constants/ordersContants";
import {
  removeCartItems,
  removeShippingAddress,
} from "../redux/actions/cartActions";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, paymentMethod, shippingAddress } = cart;

  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cartItems.reduce((acc, current) => acc + current.qty * current.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.12 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    dispatch(removeCartItems());
    dispatch(removeShippingAddress());
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="container my-5">
        <Helmet>
          <title>Cavalieri Suits | Confirmar orden</title>
          <meta name="description" content="Confirme su orden con Cavalieri" />
        </Helmet>
        <div className="row justify-content-around">
          <div className="col-12 col-lg-5">
            <div className="card card-body my-3 col-12 shadow">
              <div>
                <strong>Nombre:</strong>
                <p>{shippingAddress.fullName}</p>
                <strong>Dirección:</strong>
                <p>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
              </div>
            </div>
            <div className="card card-body my-3 col-12 shadow">
              <div>
                <strong>Método de Pago:</strong> {paymentMethod}
              </div>
              <div className="">
                <strong>Artículos en el carrito:</strong>
                <div>
                  {cartItems.map((item) => (
                    <div className="mx-auto row" key={item._id}>
                      <div className="col-8 p-0">{item.name}</div>
                      <div className="col-2 p-0">x {item.qty}</div>
                      <div className="col-2 p-0">{item.qty * item.price}</div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="card card-body my-3 px-5 shadow">
              <h2>Resumen de su compra:</h2>
              <div className="row p-3">
                <div className="col-6">Artículos:</div>
                <div className="col-6">${cart.itemsPrice.toFixed(2)}</div>

                <div className="col-6">Costos de envío:</div>
                <div className="col-6">${cart.shippingPrice.toFixed(2)}</div>

                <div className="col-6">Impuestos:</div>
                <div className="col-6">${cart.taxPrice.toFixed(2)}</div>

                <div className="col-6">
                  <strong>Total a Pagar:</strong>
                </div>
                <div className="col-6">
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </div>
                <div className="col text-center mt-5">
                  <Button
                    variant="dark"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    CONFIRMAR ORDEN
                  </Button>
                </div>
                {loading && <Loading />}
                {error && (
                  <div
                    className="alert alert-danger col-4 mx-auto"
                    role="alert"
                  >
                    {error}. Cierre sesión e inténtelo de nuevo
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
