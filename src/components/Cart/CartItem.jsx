// import "./CartItem.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

function CartItem({ item, qtyChangeHandler, removeFromCartHandler }) {
  return (
    <div className="d-flex border-bottom align-items-center justify-content-around py-1">
      <div className="cart-img">
        <img src={item.imageUrl[0]} />
      </div>
      <div className="col-6 align-self-start">
        <div className=" text-truncate">
          <Link
            className="text-decoration-none text-reset"
            to={`/product/${item.product}`}
          >
            {item.name}
          </Link>
        </div>
        <div>${item.price.toFixed(2)}</div>
        <div>
          Cantidad:{" "}
          <select
            value={item.qty}
            onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option value={x + 1} key={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="align-self-start cursor-pointer">
        <BiTrash onClick={() => removeFromCartHandler(item.product)} />
      </div>
    </div>
  );
}

export default CartItem;
