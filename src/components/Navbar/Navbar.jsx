import { Link } from "react-router-dom";
import { BiUser, BiShoppingBag, BiMenu } from "react-icons/bi";

import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { user } = useSelector((state) => state.userInfo);
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <nav className="d-flex sticky-top bg-white justify-content-between align-items-center border-bottom fs-5 px-4 py-2">
      <div className="col">
        <div className="" onClick={click}>
          <BiMenu role="button" />
        </div>
      </div>
      <div className="col">
        <Link to="/">
          <img
            style={{ height: "50px" }}
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632581908/cavalieri/LOGO_CAVALIERI_BN-3_jlxy2b.png"
            alt="logo"
          />
        </Link>
      </div>
      <ul className="d-flex col list-unstyled justify-content-end my-auto">
        <li className="mx-1 ">
          <Link className="text-black text-decoration-none" to="/cart">
            <BiShoppingBag />
            {cartItems.length > 0 ? (
              <span className="fs-6">{getCartCount()}</span>
            ) : (
              <></>
            )}
          </Link>
        </li>
        <li className="mx-1 ">
          <Link className="text-black text-decoration-none" to="/login">
            <BiUser />
            {user ? <span className="fs-6"> {user.username}</span> : <></>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
