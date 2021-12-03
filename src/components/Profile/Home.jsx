import React from "react";
import dateFormat from "dateformat";

export default function Home({ user }) {
  return (
    <div className="col-12 col-md-10 px-5 px-md-3 p-4 profile-main">
      <div className="row p-4">
        <div className="col">
          <div>
            <strong>Usuario:</strong>
            <p>{user.username}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{user.email}</p>
          </div>
          <div>
            <strong>Cliente desde:</strong>
            <p>{dateFormat(user.createdAt, "dd/mm/yyyy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
