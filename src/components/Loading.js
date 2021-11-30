import React from "react";

export default function Loading() {
  return (
    <div className="loading d-flex justify-content-center align-items-center">
      <div className="spinner-grow m-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow m-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow m-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
