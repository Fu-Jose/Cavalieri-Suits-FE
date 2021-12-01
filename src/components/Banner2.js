import React from "react";
import { Link } from "react-router-dom";

export default function Banner2() {
  return (
    <div className="container-fluid py-5">
      <div className="row flex-column-reverse flex-md-row">
        <div className="col-12 col-md-6 px-0 py-5 align-self-center text-center">
          <div className="text-black px-3">
            <h2 className="fw-bold px-3 my-3">
              Zapatos de cuero 100% ITALIANO
            </h2>
            <h3 className="fs-2 my-3">DESDE:</h3>
            <h3 className="fs-1 my-3">$299,00</h3>
          </div>
          <div>
            <Link to="/products/calzado">
              <button className="btn btn-white border border-dark rounded-0 fs-3">
                <h3 className="my-auto">Descubre</h3>
              </button>
            </Link>
          </div>
        </div>
        <div className="figure col-12 col-md-6 p-lg-5">
          <img
            className="img-main"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1634660817/cavalieri/zapatos_nen9cv.jpg"
            alt="banner"
          />
          <img
            className="img-hover"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1636841090/cavalieri/248750302_1827832947424014_2238499470237315124_n.jpg_nu0xtj.jpg"
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
}
