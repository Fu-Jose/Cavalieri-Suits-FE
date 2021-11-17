import React from "react";
import {
  FaCcPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaInstagramSquare,
  FaFacebookSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-dark sticky-bottom border-top pt-5 mt-auto">
      <div className="container footer-text">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 text-center">
            <div className="row my-3 px-5 p-lg-0">
              <img
                src="https://res.cloudinary.com/donxjonx/image/upload/v1632581901/cavalieri/LOGO_CAVALIERI_BN-2_kwx1cc.png"
                alt="logo"
              ></img>
            </div>
            <div className="d-flex my-3 py-3 fs-1 justify-content-around">
              <FaCcPaypal />
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcAmex />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 text-center">
            <strong>Compañía</strong>
            <ul className="list-unstyled text-muted">
              <li>Cookies y privacidad</li>
              <li>Condiciones de venta</li>
              <li>Trabaja con nosotros</li>
              <li>Nuestras tiendas</li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 text-center">
            <strong>Atención al cliente</strong>
            <ul className="list-unstyled text-muted">
              <li>Contáctenos</li>
              <li>Métodos de pago</li>
              <li>Ordenes y envíos</li>
              <li>Devoluciones</li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 text-center">
            <div>
              <strong>Nuestras redes sociales</strong>
            </div>
            <div className="d-flex justify-content-evenly col my-3 fs-1">
              <FaFacebookSquare />
              <FaInstagramSquare />
              <FaWhatsappSquare />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid border-top">
        <div className="row mt-1">
          <span className="text-center fw-light">
            Copyright 2021 © Cavalieri Suits S.r.l. - Av. Miguel H. Alcívar Mz.
            303, Guayaquil | P.iva 10471441005 | NoShamo Web Consulting
          </span>
        </div>
      </div>
    </footer>
  );
}
