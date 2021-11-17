import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/Admin/Sidebar";

export default function BestSellersScreen() {
  return (
    <div>
      <Helmet>
        <title>Cavalieri Suits | Administrador</title>
      </Helmet>
      <Sidebar />
    </div>
  );
}
