import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "../../client/backend";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { BiMessageDetail, BiTrash } from "react-icons/bi";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };
    getUsers();
  }, [loading]);

  const deleteHandler = async (u) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      await axios(`/users/${u._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
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
                <th>id</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td className="d-flex">
                    <button
                      type="button"
                      className="btn btn-secondary mx-1 col"
                    >
                      <BiMessageDetail /> Mensaje
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark mx-1 col"
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteModal${u._id}`}
                    >
                      <BiTrash /> Eliminar
                    </button>
                    <div
                      className="modal fade"
                      id={`deleteModal${u._id}`}
                      tabIndex="-1"
                      aria-labelledby="deleteModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">
                              Eliminar usuario...
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Está por eliminar al usuario:{" "}
                            <strong>{`${u.username}`}</strong>
                            <br />
                            Esta acción es permanente. Está seguro?
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
                                deleteHandler(u);
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
        )}
      </div>
    </div>
  );
}
