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
    } else {
      alert("No ha agregado ningún artículo a su carrito.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Cavalieri Suits | Carrito</title>
        <meta name="description" content="Su carrito de compras" />
      </Helmet>
      <div className="d-flex mb-3 my-lg-3">
        <div className="col-12 col-lg-10 py-md-2 p-md-5 row mx-auto">
          <div className="row shadow px-0 py-3 mx-auto">
            <div className="cartscreen__left col-12 col-md-8">
              <h2 className="py-2 m-0 border-bottom text-center">
                CARRITO DE COMPRAS
              </h2>
              <div className="p-0">
                {cartItems.length === 0 ? (
                  <div className="text-center p-5">
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
            </div>
            <div className="col-12 col-md-4 my-auto">
              <div className="py-3 px-0 px-lg-5 my-auto text-center">
                <div>
                  <p>
                    Subtotal ({getCartCount()}){" "}
                    {getCartCount() === 1 ? "artículo" : "artículos"}
                  </p>
                  <p>${getCartSubtotal().toFixed(2)}</p>
                </div>
                <div>
                  <Button onClick={continueHandler} variant="dark">
                    Continuar <BiCart />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
