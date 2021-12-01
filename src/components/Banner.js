import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="figure col-12 col-md-6 p-lg-5">
          <img
            className="img-main "
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632485007/cavalieri/241970855_390203482597218_6613829671935614411_n.jpg_mbmwha.jpg"
            alt="banner"
          />
          <img
            className="img-hover"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632486349/cavalieri/242512521_550045722944059_1039020318899813484_n.jpg_yzdz3v.jpg"
            alt="banner"
          />
        </div>
        <div className="col-12 col-md-6 px-0 py-5 align-self-center text-center">
          <div className="text-black px-3">
            <h2 className="fw-bold px-3 my-3">
              Los mejores precios en trajes importados a la medida.
            </h2>
            <h3 className="fs-2 my-3">DESDE:</h3>
            <h3 className="fs-1 my-3">$399,00</h3>
          </div>
          <div>
            <Link to="/products/trajes">
              <button className="btn btn-white border border-dark rounded-0 fs-3">
                <h3 className="my-auto">Descubre</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
