import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Home() {
  return (
    <div className="admin__home col-12 col-md-10">
      <div className="row my-3">
        <div className="card col-3 shadow mx-auto">
          <div className="card-body">
            <h5 className="card-title">Ganancias</h5>
            <p className="card-text fw-bold">$2,192.58</p>
            <h6 className="card-subtitle mb-2 text-muted">
              Respecto al mes pasado:
            </h6>
            <div className="d-flex">
              <span>+2.6%</span>
              <FaArrowUp className="text-success mx-2" />
            </div>
          </div>
        </div>
        <div className="card col-3 shadow mx-auto">
          <div className="card-body">
            <h5 className="card-title">Entradas</h5>
            <p className="card-text fw-bold">$3,562.80</p>
            <h6 className="card-subtitle mb-2 text-muted">
              Respecto al mes pasado:
            </h6>
            <div className="d-flex">
              <span>+9.2%</span>
              <FaArrowUp className="text-success mx-2" />
            </div>
          </div>
        </div>
        <div className="card col-3 shadow mx-auto">
          <div className="card-body">
            <h5 className="card-title">Salidas</h5>
            <p className="card-text fw-bold">$4,512.12</p>
            <h6 className="card-subtitle mb-2 text-muted">
              Respecto al mes pasado:
            </h6>
            <div className="d-flex">
              <span>-5.9%</span>
              <FaArrowDown className="text-danger mx-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="card col-11 shadow mx-auto">
          <div className="card-body">
            <h5 className="card-title">Entradas</h5>
            <p className="card-text">$3,562.80</p>
            <h6 className="card-subtitle mb-2 text-muted">
              Respecto al mes pasado:
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
