import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../redux/actions/userActions";
import { Helmet } from "react-helmet";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const role = useSelector((state) => state.userInfo.user.role);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (role === "admin") {
        history.push("/admin");
      } else {
        history.push("/profile");
      }
    }
  }, [history, role]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      dispatch(getUserInfo(data.user_id));
      history.push("/");
    } catch (error) {
      setError(`Credenciales no válidas...`);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen container border border-1 rounded border-light shadow mx-auto col-10 col-sm-10 col-md-7 col-lg-5 col-xl-5 py-5 my-4">
      <Helmet>
        <title>Cavalieri Suits | Iniciar sesión</title>
      </Helmet>
      <Form className="login-screen__form mx-lg-5" onSubmit={loginHandler}>
        <h3 className="login-screen__title">Iniciar sesión</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            id="email"
            type="email"
            placeholder="Ingrese su dirección de correo electrónico"
            value={email}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
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
            tabIndex={2}
          />
        </Form.Group>
        <Link to="/forgotpassword" tabIndex={4}>
          Has olvidado tu contraseña?
        </Link>
        <br />
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <Button type="submit" variant="dark" tabIndex={3}>
              Iniciar sesión
            </Button>
          </div>
          <div className="text-center my-auto">
            <span className="login-screen__subtext m-4">
              No está registrado?
            </span>
            <br />
            <Link to="/register" tabIndex={5}>
              Crear una cuenta
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginScreen;
