// import "./CartItem.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

function CartItem({ item, qtyChangeHandler, removeFromCartHandler }) {
  return (
    <div className="d-flex my-3 justify-content-between align-items-center">
      <div className="col-6 p-0 text-truncate">
        <Link
          className="text-decoration-none text-reset"
          to={`/products/${item.product}`}
        >
          {item.name}
        </Link>
      </div>
      <div className="col-2 p-0 text-center">${item.price.toFixed(2)}</div>
      <div className="col-2 p-0 text-center">
        <select
          // className="cartitem__select  mx-1"
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
      <div className="col-2 p-0 text-center">
        <Button
          className="cartitem__deleteBtn"
          variant="dark"
          onClick={() => removeFromCartHandler(item.product)}
        >
          <BiTrash />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
