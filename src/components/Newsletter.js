import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Newsletter() {
  const { role } = useSelector((state) => state.userInfo.user);
  return (
    <>
      {!role ? (
        <section className="bg-light container-fluid mx-auto row">
          <div className="d-md-flex d-none col-md-6 p-4">
            <img
              src="https://res.cloudinary.com/donxjonx/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1634654236/cavalieri/cava2_pox6yx.jpg"
              alt="newsletter logo"
            />
          </div>
          <div className="col-12 col-md-6 py-3 text-center align-self-center">
            <div className="row">
              <h2>- Suscríbete -</h2>
              <span>
                Y recibe las últimas novedades y ofertas
                <br />
                directamente en tu bandeja de correo electrónico.
              </span>
              <form>
                <ul className="list-unstyled">
                  <li className="my-3">
                    <input
                      // id="home_newsletter_input"
                      className="border rounded-0 text-center p-1"
                      type="email"
                      placeholder="CORREO ELECTRÓNICO"
                    ></input>
                  </li>
                  <li className="my-3">
                    <input
                      id="home_newsletter_checkbox"
                      type="checkbox"
                    ></input>
                    <span id="home_newsletter_textbox" className="mx-1">
                      He leído y estoy conforme con los{" "}
                      <Link to="/terms">términos y condiciones</Link>.
                    </span>
                  </li>
                  <li className="my-3">
                    <button className="btn btn-dark">SUSCRIBIRSE</button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
