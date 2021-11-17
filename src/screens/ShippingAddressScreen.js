import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/Checkout/Checkout";
import { Button, Form } from "react-bootstrap";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { Helmet } from "react-helmet";

export default function ShippingAddressScreen(props) {
  const user = useSelector((state) => state.userInfo.user);
  const { username } = user;

  if (!username) {
    props.history.push("/login");
  }

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container">
        <Helmet>
          <title>Cavalieri Suits | Dirección</title>
          <meta
            name="description"
            content="Ingrese su dirección para continuar con su compra"
          />
        </Helmet>
        <Form
          className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6 mx-auto my-5"
          onSubmit={submitHandler}
        >
          <Form.Group className="my-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              placeholder="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              id="address"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              id="city"
              placeholder="Ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              id="postalCode"
              placeholder="Código Postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              id="country"
              placeholder="País"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex my-4">
            <Button className="col-4 mx-auto" type="submit" variant="dark">
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
