import { Link } from "react-router-dom";
import { BiUser, BiShoppingBag, BiMenu } from "react-icons/bi";

import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // const { user } = useSelector((state) => state.userInfo);
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  return (
    <nav className="d-flex sticky-top bg-white align-items-center border-bottom px-3 px-md-4 fs-5 py-2">
      <div className="col">
        <BiMenu role="button" onClick={click} />
      </div>
      <div className="col">
        <Link to="/">
          <img
            className="logo-img"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632581908/cavalieri/LOGO_CAVALIERI_BN-3_jlxy2b.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="col">
        <ul className="d-flex list-unstyled justify-content-end my-auto">
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
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
