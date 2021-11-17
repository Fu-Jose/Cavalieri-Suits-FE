import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "../client/backend";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.status + " " + error.response.statusText);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen container border border-1 rounded border-light shadow mx-auto col-10 col-sm-10 col-md-7 col-lg-5 col-xl-5 py-5 my-4">
      <Helmet>
        <title>{`Cavalieri Suits | Reset contraseña`}</title>
        <meta name="description" content="Reset contraseña" />
      </Helmet>
      <Form
        className="forgotpassword-screen__form my-3 mx-lg-5"
        onSubmit={forgotPasswordHandler}
      >
        <h3 className="forgotpassword-screen__title">Reseteo de contraseña</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && <span className="success-message">{success}</span>}
        <Form.Group className="my-3">
          <Form.Label>
            Ingrese la dirección de correo electrónico que usó para registrarse
          </Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex">
          <Button className="mx-auto" type="submit" variant="dark">
            Enviar email
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordScreen;
