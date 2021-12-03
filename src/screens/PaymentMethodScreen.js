import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CheckoutSteps from "../components/Checkout/Checkout";
import { Button, Form } from "react-bootstrap";
import { savePaymentMethod } from "../redux/actions/cartActions";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState({});
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Helmet>
        <title>Cavalieri Suits | Método de Pago</title>
        <meta
          name="description"
          content="Seleccione su método de pago preferido"
        />
      </Helmet>
      <div className="container">
        <Form
          className="row col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6 mx-auto my-5"
          onSubmit={submitHandler}
        >
          <div className="mx-auto my-auto text-center">
            <Form.Check
              className="my-2"
              inline
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              label="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <Form.Check
              className="my-2"
              inline
              type="radio"
              id="transferencia"
              value="Transferencia Bancaria"
              name="paymentMethod"
              label="Transferencia Bancaria"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
          </div>
          <div className="col-10 mx-auto my-3 p-3">
            <div className="shadow">
              <img
                src="https://res.cloudinary.com/donxjonx/image/upload/v1638362612/pp-banner_cci84j.jpg"
                alt="paypal banner"
              />
            </div>
          </div>
          <div className="col-12 text-center my-3">
            <Button className="col-4" type="submit" variant="dark">
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
