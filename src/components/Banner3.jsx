import React from "react";
import { Link } from "react-router-dom";

export default function Banner3() {
  return (
    <div className="container text-black fw-bold text-center">
      <div className="row">
        <div className="fs-1 my-3">
          <h2 className="fw-bold">ACCESORIOS</h2>
        </div>
        <div className="col-12 col-lg-4">
          <Link to="/products/cinturones">
            <img
              className="my-3 p-4"
              src="https://res.cloudinary.com/donxjonx/image/upload/v1635590427/cavalieri/cinturon_juh3pw.jpg"
              alt="cinturones"
            />
          </Link>
          <span className="fs-3">Cinturones</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
        <div className="col-12 col-lg-4">
          <Link to="/products/accesorios">
            <img
              className="my-3 p-4"
              src="https://res.cloudinary.com/donxjonx/image/upload/v1635590585/cavalieri/wrist_skull_l1moch.jpg"
              alt="brazaletes"
            />
          </Link>
          <span className="fs-3">Brazaletes</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
        <div className="col-12 col-lg-4">
          <Link to="/products/accesorios">
            <img
              className="my-3 p-4"
              src="https://res.cloudinary.com/donxjonx/image/upload/v1635590394/cavalieri/corbatas2_uhzz2s.jpg"
              alt="corbatas"
            />
          </Link>
          <span className="fs-3">Corbatas</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
      </div>
    </div>
  );
}
