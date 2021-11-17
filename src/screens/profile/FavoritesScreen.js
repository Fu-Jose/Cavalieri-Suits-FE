import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/userActions";

import { Helmet } from "react-helmet";
import Error from "../../components/Error";
import Sidebar from "../../components/Profile/Sidebar";
import Favorites from "../../components/Profile/Favorites";

export default function FavoritesScreen() {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.userInfo);
  const user_id = user._id;

  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);
  return (
    <>
      <Helmet>
        <title>Cavalieri Suits | Favoritos</title>
        <meta name="description" content="Lista favoritos del Cliente" />
      </Helmet>
      {error ? (
        <Error error={error} />
      ) : (
        <div className="d-flex">
          <div className="card col-12 col-lg-8 mx-auto my-5">
            <div className="row">
              <Sidebar />
              <Favorites user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
