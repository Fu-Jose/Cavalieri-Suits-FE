import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Carousel, Container } from "react-bootstrap";
import Loading from "../components/Loading";
import { getProductDetails } from "../redux/actions/productsActions";
import { addToCart } from "../redux/actions/cartActions";
import axios from "../client/backend";
import { getUserInfo } from "../redux/actions/userActions";

const ProductDetails = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userInfo);
  const productId = match.params.id;
  const productDetails = useSelector((state) => state.getProductDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    // if (product && match.params.id !== product._id) {
    dispatch(getProductDetails(match.params.id));
    // }
    // if (user.favorites.some((e) => e._id === productId)) {
    //   console.log("Found");
    //   setIsFavorite(true);
    // } else {
    //   console.log("NOT FOUND");
    //   setIsFavorite(false);
    // }
    // console.log(isFavorite);
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (user._id) {
      dispatch(getUserInfo(user._id));
    }
    setLoad(false);
  }, [dispatch, user._id, isFavorite]);

  useEffect(() => {
    if (user._id) {
      if (user.favorites.some((e) => e._id === productId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [user._id, user.favorites, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    // history.push("/cart");
  };

  const addToFavorites = async () => {
    if (user._id) {
      setLoad(true);
      const token = localStorage.getItem("authToken");
      await axios.put(`/users/${user._id}/favorites/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFavorite(true);
    } else {
      alert("Por favor inicie sesión para agregar y gestionar sus favoritos");
    }
  };

  const removeFromFavorites = async () => {
    setLoad(true);
    const token = localStorage.getItem("authToken");
    await axios.put(`/users/${user._id}/favorites/${product._id}/remove`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsFavorite(false);
  };

  return (
    <Container className="productdetails mx-auto my-3 my-lg-0">
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {product._id && (
            <div className="row">
              <Helmet>
                <title>{`Cavalieri Suits | ${product.name}`}</title>
                <meta name="description" content={`${product.description}`} />
              </Helmet>
              <div className="productdetails__left col-12 col-lg-5 my-auto">
                {Array.isArray(product.imageUrl) && (
                  <div className="left__image">
                    <Carousel
                      // activeIndex={index}
                      // onSelect={handleSelect}
                      nextLabel=""
                      prevLabel=""
                    >
                      {product.imageUrl.map((i, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100 cursor-pointer"
                            src={i}
                            alt={index}
                            data-bs-toggle="modal"
                            data-bs-target={`#deliverModal${index}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    {product.imageUrl.map((i, index) => (
                      <div
                        className="modal fade"
                        id={`deliverModal${index}`}
                        key={index}
                        tabIndex="-1"
                        aria-labelledby={`deliverModal${index}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body p-1">
                              <img className="modal-img" src={i} alt={i} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="productdetails__right d-flex row justify-content-evenly mx-auto my-5 col-12 col-lg-7">
                <Container className="left__info px-3 px-md-4 px-lg-5 py-2">
                  <h2 className="left__name fw-bold fs-1">{product.name}</h2>
                  <p>{product.description}</p>
                </Container>
                <Container className="right__info px-3 px-md-4 px-lg-5 py-2">
                  <p>
                    Precio: <strong>${product.price}</strong>
                  </p>
                  <p>
                    Disponibilidad:{" "}
                    <strong>
                      {product.countInStock > 0 ? "En Stock" : "Agotado"}
                    </strong>
                  </p>
                  <p>
                    Qty
                    <select
                      className="mx-2"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </p>
                  <div className="row py-3 justify-content-between text-center">
                    <div className="col-12 my-2 col-lg-6">
                      <Button
                        className="col-8 col-md-6 col-lg-12"
                        variant="dark"
                        onClick={addToCartHandler}
                      >
                        <box-icon
                          type="regular"
                          color="white"
                          size="sm"
                          name="cart"
                          animation="tada-hover"
                        />
                        <span className="ms-2">Agregar al carrito</span>
                      </Button>
                    </div>
                    <div className="col-12 my-2 col-lg-6">
                      {isFavorite ? (
                        <Button
                          className="col-8 col-md-6 col-lg-12"
                          variant="secondary"
                          onClick={removeFromFavorites}
                        >
                          {!load ? (
                            <box-icon
                              type="solid"
                              color="white"
                              size="sm"
                              name="heart"
                              animation="tada-hover"
                            />
                          ) : (
                            <></>
                          )}
                          {load ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="ms-2">En favoritos</span>
                          )}
                        </Button>
                      ) : (
                        <Button
                          className="col-8 col-md-6 col-lg-12"
                          variant="secondary"
                          onClick={addToFavorites}
                        >
                          {!load ? (
                            <box-icon
                              type="regular"
                              color="white"
                              size="sm"
                              name="heart"
                              animation="tada-hover"
                            />
                          ) : (
                            <></>
                          )}
                          {load ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                              <div
                                className="spinner-grow spinner-button mx-1 py-1"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="ms-2">Agregar a favoritos</span>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductDetails;
