import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Las contraseñas ingresadas no coinciden");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen container border border-1 rounded border-light shadow mx-auto col-10 col-sm-10 col-md-7 col-lg-5 col-xl-5 py-5 my-4">
      <Helmet>
        <title>Cavalieri Suits | Reset contraseña</title>
        <meta name="description" content="Reset contraseña" />
      </Helmet>
      <Form
        className="resetpassword-screen__form mx-lg-5"
        onSubmit={resetPasswordHandler}
      >
        <h3 className="resetpassword-screen__title">Cambio de contraseña</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <span className="success-message">
            {success}
            <Link to="/login">Iniciar sesión</Link>
          </span>
        )}
        <Form.Group className="my-3">
          <Form.Label>Ingrese su nueva contraseña</Form.Label>
          <Form.Control
            required
            id="password"
            type="password"
            placeholder="Nueva Contraseña"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Confirme su nueva contraseña</Form.Label>
          <Form.Control
            required
            id="confirmpassword"
            type="password"
            placeholder="Nueva Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Cambiar contraseña
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordScreen;
