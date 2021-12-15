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
    <footer className="row mx-auto border-top text-center">
      <div className="pt-3 py-md-3 col-12 col-md-6 col-lg-3 order-1 order-lg-1 row mx-auto justify-content-around align-items-center">
        <div className="py-2">
          <img
            className="footer-logo"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632581901/cavalieri/LOGO_CAVALIERI_BN-2_kwx1cc.png"
            alt="logo"
          ></img>
        </div>
        <div className="d-none d-md-flex p-3 justify-content-around">
          <FaCcPaypal className="footer-icon" />
          <FaCcVisa className="footer-icon" />
          <FaCcMastercard className="footer-icon" />
          <FaCcAmex className="footer-icon" />
        </div>
      </div>
      <div className="py-3 col-6 col-md-6 col-lg-3 order-3 order-lg-2 align-self-center">
        <strong>Compañía</strong>
        <ul className="list-unstyled text-muted mb-0">
          <li>Cookies y privacidad</li>
          <li>Condiciones de venta</li>
          <li>Trabaja con nosotros</li>
          <li>Nuestras tiendas</li>
        </ul>
      </div>
      <div className="py-3 col-6 col-md-6 col-lg-3 order-4 order-lg-3 align-self-center">
        <strong>Atención al cliente</strong>
        <ul className="list-unstyled text-muted mb-0">
          <li>Contáctenos</li>
          <li>Métodos de pago</li>
          <li>Ordenes y envíos</li>
          <li>Devoluciones</li>
        </ul>
      </div>
      <div className="py-md-3 col-12 col-md-6 col-lg-3 order-2 order-lg-4 row mx-auto justify-content-around">
        <div className="d-none d-md-block p-3">
          <strong>Nuestras redes sociales</strong>
        </div>
        <div className="d-flex p-3 justify-content-around">
          <FaFacebookSquare className="footer-icon" />
          <FaInstagramSquare className="footer-icon" />
          <FaWhatsappSquare className="footer-icon" />
        </div>
      </div>
      <div className="order-5 text-center border-top">
        <span className="fw-light">
          Copyright 2021 © Cavalieri Suits S.r.l. - Av. Miguel H. Alcívar Mz.
          303, Guayaquil |{" "}
          <a
            className="text-decoration-none text-dark"
            href="http://www.jfoo.it"
          >
            www.jfoo.it
          </a>
        </span>
      </div>
    </footer>
  );
}
