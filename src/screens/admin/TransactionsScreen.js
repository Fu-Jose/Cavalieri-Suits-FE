import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import dateFormat from "dateformat";
import { i18n } from "dateformat";
import Sidebar from "../../components/Admin/Sidebar";
import Loading from "../../components/Loading";
import { BiDollarCircle, BiPackage } from "react-icons/bi";
import Error from "../../components/Error";

i18n.dayNames = [
  "Dom",
  "Lun",
  "Mar",
  "Miér",
  "Jue",
  "Vier",
  "Sáb",
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

i18n.monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

i18n.timeNames = ["a", "p", "am", "pm", "A", "P", "AM", "PM"];

export default function TransactionsScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };
    getOrders();
  }, [loading]);

  const deliveryHandler = async (o) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await axios(`/api/orders/${o._id}/deliver`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex row mx-auto">
      <Helmet>
        <title>Cavalieri Suits | Administrador</title>
      </Helmet>
      <Sidebar />
      <div className="mx-auto col-10">
        {error ? (
          <Error error="Su sesión ha caducado" />
        ) : loading ? (
          <Loading />
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Número de orden</th>
                <th>Usuario</th>
                <th>Productos</th>
                <th>Precio</th>
                <th>Método de pago</th>
                <th>Última actualización</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>
                    <Link to={`/order/${o._id}`}>{o._id}</Link>
                  </td>
                  <td>{o.user.username}</td>
                  <td>
                    <ul className="list-unstyled">
                      {o.orderItems.map((i) => (
                        <li key={i._id}>
                          {i.qty} - {i.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{o.totalPrice}</td>
                  <td>{o.paymentMethod}</td>
                  <td>
                    {!o.updatedAt
                      ? dateFormat(o.createdAt, "dd/mm/yy, hh:MM TT")
                      : dateFormat(o.updatedAt, "dd/mm/yy, hh:MM TT")}
                  </td>
                  <td>
                    {!o.isPaid ? (
                      <BiDollarCircle className="rounded-circle text-danger bg-white border fs-4 mx-2" />
                    ) : (
                      <BiDollarCircle className="rounded-circle text-success bg-white border fs-4 mx-2" />
                    )}
                    {!o.isDelivered ? (
                      <>
                        <BiPackage
                          role="button"
                          className="rounded-circle text-danger bg-white border fs-4 mx-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#deliverModal${o._id}`}
                        />
                        <div
                          className="modal fade"
                          id={`deliverModal${o._id}`}
                          tabIndex="-1"
                          aria-labelledby="deliverModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="deliverModalLabel"
                                >
                                  Cambio estado del orden...
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                Está por cambiar el estado del orden{" "}
                                <strong>{o._id}</strong> a:{" "}
                                <strong>"ENTREGADO"</strong>
                                <div className="mt-3">
                                  <p>Contenido:</p>
                                  <ul className="list-unstyled">
                                    {o.orderItems.map((i) => (
                                      <li key={i._id}>
                                        {i.qty} - {i.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    deliveryHandler(o);
                                  }}
                                >
                                  Confirmar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <BiPackage
                          role="button"
                          className="rounded-circle text-success bg-white border fs-4 mx-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#notdeliverModal${o._id}`}
                        />
                        <div
                          className="modal fade"
                          id={`notdeliverModal${o._id}`}
                          tabIndex="-1"
                          aria-labelledby="notdeliverModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="notdeliverModalLabel"
                                >
                                  Cambio estado del orden...
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                Está por cambiar el estado del orden{" "}
                                <strong>{o._id}</strong> a:{" "}
                                <strong>"NO ENTREGADO"</strong>
                                <div className="mt-3">
                                  <p>Contenido:</p>
                                  <ul className="list-unstyled">
                                    {o.orderItems.map((i) => (
                                      <li key={i._id}>
                                        {i.qty} - {i.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    deliveryHandler(o);
                                  }}
                                >
                                  Confirmar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
