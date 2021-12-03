import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { listOrderMine } from "../../redux/actions/ordersActions";
import dateFormat from "dateformat";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div className="col-12 col-md-10 profile-main">
      <Helmet>
        <title>{`Cavalieri Suits | Historial`}</title>
        <meta name="description" content="Historial de sus órdenes" />
      </Helmet>
      <div className="p-3">
        <h3>Historial de compras</h3>
      </div>
      {loading ? (
        <Loading ClassName="loading" />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div style={{ height: "50vh", overflow: "auto" }}>
          <table className="table table-striped history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>PAGADO</th>
                {/* <th>ENTREGADO</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-truncate">
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{dateFormat(order.createdAt, "dd/mm/yy")}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? dateFormat(order.paidAt, "dd/mm/yy") : "No"}
                  </td>
                  {/* <td>
                    {order.isDelivered
                      ? dateFormat(order.deliveredAt, "dd/mm/yy")
                      : "No"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
