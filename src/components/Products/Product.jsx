import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ name, price, id, imageUrl }) => {
  return (
    <Link className="text-decoration-none text-dark" to={`/product/${id}`}>
      <Card className="m-0 border-0">
        <Card.Img className="product-img" src={imageUrl} alt={name} />
        <Card.Body className="px-2 py-3">
          <p className="fw-bold mb-1 lh-sm">{name}</p>
          <p>${price}</p>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
