import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidedrawer({ show, click }) {
  const sideDrawerClass = [
    "sidedrawer",
    "d-flex",
    "flex-column",
    "justify-content-between",
  ];
  if (show) {
    sideDrawerClass.push("show");
  }
  return (
    <div className={sideDrawerClass.join(" ")}>
      <ListGroup
        className="sidedrawer__top my-3 col justify-content-center"
        onClick={click}
      >
        <Link to="/products" className="text text-decoration-none text-center">
          <ListGroup.Item action>Todos los productos</ListGroup.Item>
        </Link>
        <Link
          to="/products/trajes"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Trajes</ListGroup.Item>
        </Link>
        <Link
          to="/products/blazers"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Blazers</ListGroup.Item>
        </Link>
        <Link
          to="/products/camisas"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Camisas</ListGroup.Item>
        </Link>
        <Link
          to="/products/pantalones"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Pantalones</ListGroup.Item>
        </Link>
        <Link
          to="/products/calzado"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Calzado</ListGroup.Item>
        </Link>
        <Link
          to="/products/cinturones"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Cinturones</ListGroup.Item>
        </Link>
        <Link
          to="/products/accesorios"
          className="text text-decoration-none text-center"
        >
          <ListGroup.Item action>Accesorios</ListGroup.Item>
        </Link>
      </ListGroup>
      <Container className="sidedrawer__bottom">
        <Container className="d-flex flex-column align-items-center my-3">
          <img
            className="my-2"
            src="https://res.cloudinary.com/donxjonx/image/upload/v1632581901/cavalieri/LOGO_CAVALIERI_BN-2_kwx1cc.png"
            alt="logo"
          ></img>
          {/* <p>Av. Miguel H. Alcívar Mz. 303, Guayaquil</p>
          <p>+593988600937</p>
          <p>Av. Samborondón, Km 1.5 Samborondon Plaza, Samborondón</p>
          <p>+593987671528</p> */}
        </Container>
      </Container>
    </div>
  );
}

export default Sidedrawer;
