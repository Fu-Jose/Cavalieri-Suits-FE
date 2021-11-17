import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Las contraseñas no coinciden");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen container border border-1 rounded border-light shadow mx-auto col-10 col-sm-10 col-md-7 col-lg-5 col-xl-5 py-5 my-4">
      <Helmet>
        <title>Cavalieri Suits | Registración</title>
        <meta
          name="description"
          content="Regístrese como cliente en Cavalieri Suits para poder realizar compras"
        />
      </Helmet>
      <Form
        className="register-screen__form mx-lg-5"
        onSubmit={registerHandler}
      >
        <h3 className="register-screen__title">Crear nuevo usuario</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form.Group className="my-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            required
            id="username"
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            placeholder="Ingrese su dirección de correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Confirme su contraseña</Form.Label>
          <Form.Control
            required
            id="confirmPassword"
            type="password"
            placeholder="Ingrese su contraseña nuevamente"
            value={confirmPassword}
            autoComplete="on"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <Button variant="dark" type="submit">
              Registrarse
            </Button>
          </div>
          <div className="text-center my-auto">
            <span className="register-screen__subtext m-4">
              Ya está registrado?
            </span>
            <br />
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterScreen;
