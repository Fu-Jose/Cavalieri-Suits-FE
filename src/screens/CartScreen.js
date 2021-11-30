import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Container } from "react-bootstrap";
import CartItem from "../components/Cart/CartItem";
import { BiCart } from "react-icons/bi";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const continueHandler = () => {
    if (cartItems.length > 0) {
      history.push("/shipping");
    }
  };

  return (
    <>
      <Helmet>
        <title>Cavalieri Suits | Carrito</title>
        <meta name="description" content="Su carrito de compras" />
      </Helmet>
      <div className="d-flex my-lg-3">
        <div className="col-12 col-lg-10 p-md-5 row mx-auto">
          <div className="row shadow px-0 p-md-5 mx-auto">
            <div className="cartscreen__left col-12 col-md-8 py-0 py-lg-5 px-0 px-lg-5 ">
              <h2 className="py-2 py-lg-3 border-bottom text-center">
                CARRITO DE COMPRAS
              </h2>
            </div>
            <div className="cartscreen__left col-12 col-md-8 py-0 py-lg-5 px-0 px-md-0 px-lg-5">
              {cartItems.length === 0 ? (
                <div>
                  Su carrito está vacío. <Link to="/">Volver atrás?</Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.product}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))
              )}
            </div>
            <div className="cartscreen__right col-12 col-md-4 py-5 px-0 px-lg-5 my-auto">
              <div className="cartscreen__info py-3">
                <p>
                  Subtotal ({getCartCount()}){" "}
                  {getCartCount() === 1 ? "artículo" : "artículos"}
                </p>
                <p>${getCartSubtotal().toFixed(2)}</p>
              </div>
            </div>
            <div className="cartscreen__left col-12 col-md-8 py-3 py-lg-5 px-0 px-md-0 px-lg-5">
              <Button onClick={continueHandler} variant="dark">
                Continuar <BiCart />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
