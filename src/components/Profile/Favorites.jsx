import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../redux/actions/userActions";
import axios from "../../client/backend";
import Loading from "../Loading";

export default function Favorites({ user }) {
  const favorites = user.favorites;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(user._id));
    setLoading(false);
  }, [loading, user._id, dispatch]);

  const removeFromFavorites = async (f) => {
    const token = localStorage.getItem("authToken");
    await axios.put(`/users/${user._id}/favorites/${f._id}/remove`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(true);
    console.log(f);
  };

  return (
    <div className="col-12 col-lg-9 p-4">
      <div className="row pe-4">
        <h3>Sus favoritos</h3>
      </div>
      <div className="row p-4">
        {!loading ? (
          favorites.length > 0 ? (
            favorites.map((f, index) => (
              <div className="col-3" key={index}>
                <Card className="border-0 position-relative">
                  <Link
                    className="text-decoration-none fs-6 text-dark"
                    to={`/product/${f._id}`}
                  >
                    <Card.Img src={f.imageUrl[0]} alt={f.name} />
                    <Card.Body className="px-0">
                      <p className="fw-bold text-truncate">{f.name}</p>
                    </Card.Body>
                  </Link>
                  <div
                    className="btn position-absolute p-1"
                    onClick={() => {
                      removeFromFavorites(f);
                    }}
                  >
                    <box-icon
                      type="solid"
                      color="white"
                      size="sm"
                      name="heart"
                      animation="flashing-hover"
                    />
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <>Aún no ha añadido ningún artículo a sus favoritos</>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
