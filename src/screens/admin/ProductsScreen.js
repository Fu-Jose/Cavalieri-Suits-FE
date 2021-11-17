import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import axios from "axios";
import Error from "../../components/Error";
import Sidebar from "../../components/Admin/Sidebar";
import Loading from "../../components/Loading";
import Form from "../../components/Admin/Form";
import { BiAddToQueue, BiEdit, BiTrash } from "react-icons/bi";
import { createProductReset } from "../../redux/actions/productsActions";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category) {
      const getProducts = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const { data } = await axios.get(
            `${process.env.REACT_APP_REACT_APP_SERVER_URL}/products`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          await axios.get("/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProducts(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          console.error(error);
        }
      };
      getProducts();
    } else {
      const getProducts = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const { data } = await axios.get(`/products/categoria/${category}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProducts(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          console.error(error);
        }
      };
      getProducts();
    }
  }, [loading, category]);

  const deleteHandler = async (p) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await axios(`/products/${p._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
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
          <>
            <div className="d-flex my-3">
              <div className="mx-2">
                <button
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  <BiAddToQueue /> Agregar
                </button>
                <div
                  className="modal fade"
                  id="addModal"
                  tabIndex="-1"
                  aria-labelledby="addModalLabel"
                  aria-hidden="true"
                  data-bs-backdrop="static"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">
                          Agregar producto...
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            dispatch(createProductReset(), setLoading(true));
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <Form />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            dispatch(createProductReset(), setLoading(true));
                          }}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCategory("");
                  }}
                >
                  Categoría
                </button>
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Trajes
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Blazers
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Camisas
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Pantalones
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Calzado
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Cinturones
                  </li>
                  <li
                    className="btn mx-3"
                    onClick={(e) => {
                      setCategory(e.target.innerHTML);
                    }}
                  >
                    Accesorios
                  </li>
                </ul>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Inventario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.imageUrl[0]}
                        style={{ height: "50px" }}
                        alt={p.name}
                      />
                    </td>
                    <td>
                      <Link to={`/product/${p._id}`} className="text-dark">
                        {p.name}
                      </Link>
                    </td>
                    <td className="no-wrap">{p.description}</td>
                    <td>${p.price}</td>
                    <td>{p.category}</td>
                    <td className="text-center">{p.countInStock}</td>
                    <td className="p-3">
                      <button
                        className="m-1 btn btn-secondary col"
                        data-bs-toggle="modal"
                        data-bs-target={`#modModal${p._id}`}
                      >
                        <BiEdit />
                      </button>
                      <div
                        className="modal fade"
                        id={`modModal${p._id}`}
                        tabIndex="-1"
                        aria-labelledby="modModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="modModalLabel">
                                Modificar {p.name}...
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <Form />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-dark"
                                data-bs-dismiss="modal"
                              >
                                Cerrar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="m-1 btn btn-dark col"
                        data-bs-toggle="modal"
                        data-bs-target={`#deleteModal${p._id}`}
                      >
                        <BiTrash />
                      </button>
                      <div
                        className="modal fade"
                        id={`deleteModal${p._id}`}
                        tabIndex="-1"
                        aria-labelledby="deleteModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="deleteModalLabel">
                                Borrar producto...
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              Está por eliminar{" "}
                              <strong className="text-danger">{p.name}</strong>{" "}
                              de su inventario.
                              <br />
                              Esta acción es permanente, está seguro?
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
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  deleteHandler(p);
                                }}
                              >
                                Confirmar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
