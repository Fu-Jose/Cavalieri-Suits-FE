import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { Helmet } from "react-helmet";
export default function ReviewsScreen() {
  return (
    <div>
      <Helmet>
        <title>Cavalieri Suits | Administrador</title>
      </Helmet>
      <Sidebar />
    </div>
  );
}
