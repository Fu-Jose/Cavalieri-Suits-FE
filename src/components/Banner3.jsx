import React from "react";

export default function Banner4() {
  return (
    <div className="container my-3 text-black fw-bold text-center">
      <div className="row px-3 px-lg-5">
        <div className="fs-1 my-3">
          <h2 className="fw-bold">ACCESORIOS</h2>
        </div>
        <div className="col-12 col-lg-4">
          <img
            className="my-3"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1635590427/cavalieri/cinturon_juh3pw.jpg"
            alt="cinturones"
          />
          <span className="fs-3">Cinturones</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
        <div className="col-12 col-lg-4">
          <img
            className="my-3"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1635590585/cavalieri/wrist_skull_l1moch.jpg"
            alt="brazaletes"
          />
          <span className="fs-3">Brazaletes</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
        <div className="col-12 col-lg-4">
          <img
            className="my-3"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1635590394/cavalieri/corbatas2_uhzz2s.jpg"
            alt="corbatas"
          />
          <span className="fs-3">Corbatas</span>
          <br />
          <span className="fw-normal fs-5">Desde: $40,00</span>
        </div>
      </div>
    </div>
  );
}
