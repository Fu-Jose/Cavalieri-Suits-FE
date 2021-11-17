import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/userActions";

import { Helmet } from "react-helmet";
import Error from "../../components/Error";
import Sidebar from "../../components/Profile/Sidebar";
import OrderHistory from "../../components/Profile/OrderHistory";

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.userInfo);
  const user_id = user._id;

  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);
  return (
    <>
      <Helmet>
        <title>Cavalieri Suits | Historial</title>
        <meta name="description" content="Historial de ordenes" />
      </Helmet>
      {error ? (
        <Error error={error} />
      ) : (
        <div className="d-flex">
          <div className="card col-8 mx-auto my-5">
            <div className="row">
              <Sidebar />
              <OrderHistory />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
