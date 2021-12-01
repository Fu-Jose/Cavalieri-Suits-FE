import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/Admin/Sidebar";
import Home from "../../components/Admin/Home";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/userActions";
import Error from "../../components/Error";

const AdminScreen = () => {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.userInfo);
  // const { refreshToken } = user;
  const user_id = user._id;
  useEffect(() => {
    dispatch(getUserInfo(user_id));
  }, [dispatch, user_id]);

  // useEffect(() => {
  //   const { refreshToken } = user;
  //   const getToken = async () => {
  //     // const oldtoken = localStorage.getItem("authToken");
  //     const { data } = await axios("/api/auth/refreshToken", {
  //       method: "POST",
  //       // headers: { Authorization: `Bearer ${oldtoken}` },
  //       data: { refreshToken },
  //     });
  //     console.log(data);
  //     const { token } = data;
  //     localStorage.setItem("authToken", token);
  //   };
  //   getToken(refreshToken);
  // }, [user]);

  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <div className="d-flex row mx-auto h-100">
          <Helmet>
            <title>Cavalieri Suits | Administrador</title>
            <meta name="description" content="Página del Admin" />
          </Helmet>
          <Sidebar />
          <Home />
        </div>
      )}
    </>
  );
};

export default AdminScreen;
