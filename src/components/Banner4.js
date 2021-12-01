import React from "react";

export default function Banner4() {
  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="figure col-12 col-md-6 p-2 p-lg-5">
          <img
            src="https://res.cloudinary.com/donxjonx/image/upload/v1636673483/cavalieri/service_fwxecx.jpg"
            alt="banner"
          />
        </div>
        <div className="col-12 col-md-6 px-0 py-5 align-self-center text-center">
          <div className="text-black">
            <h2 className="fs-1 px-5 fw-bold my-5">
              En Cavalieri nuestros clientes son únicos.
            </h2>
            <h3 className="fs-5 px-5 my-5">
              Servicio de sastrería en nuestros locales.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
