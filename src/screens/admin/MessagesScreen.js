import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/Admin/Sidebar";
import Messenger from "../../components/Chat/Messenger";

export default function MessagesScreen() {
  return (
    <div className="d-flex row mx-auto">
      <Helmet>
        <title>Cavalieri Suits | Administrador</title>
      </Helmet>
      <Sidebar />
      <Messenger />
    </div>
  );
}
