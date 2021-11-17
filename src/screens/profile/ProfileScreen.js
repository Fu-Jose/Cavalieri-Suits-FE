import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/userActions";
import Error from "../../components/Error";
// import Messenger from "../components/Chat/Messenger";
import Sidebar from "../../components/Profile/Sidebar";
import Home from "../../components/Profile/Home";

export default function ProfileScreen({ history }) {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.userInfo);
  const user_id = user._id;

  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);

  return (
    <>
      <Helmet>
        <title>Cavalieri Suits | Perfil</title>
        <meta name="description" content="Perfil del cliente Cavalieri Suits" />
      </Helmet>
      {error ? (
        <Error error={error} />
      ) : (
        <div className="d-flex">
          <div className="card col-8 mx-auto my-5">
            <div className="row">
              <Sidebar />
              <Home user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
