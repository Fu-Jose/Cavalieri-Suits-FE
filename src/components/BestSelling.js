import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BestSelling() {
  return (
    <section className="bg-light d-flex row container-fluid mx-auto">
      <div className="text-center fs-3 py-3">
        <h2 className="fw-bold">LO MÁS VENDIDO</h2>
      </div>
      <div className="text-center fw-bold row py-3 flex-nowrap mx-auto overflow-auto">
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img
              src="https://res.cloudinary.com/donxjonx/image/upload/v1634663817/cavalieri/best_seller_2_knpvfe.jpg"
              alt="Traje Lazio Azul"
            />
            <Card.Title className="my-2">Traje Napoli 3 piezas</Card.Title>
            <Card.Text>$699,00</Card.Text>
          </Card>
        </Link>
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img
              src="https://res.cloudinary.com/donxjonx/image/upload/v1634663814/cavalieri/best_seller_1_f99kci.jpg"
              alt="Traje Lazio Azul"
            />
            <Card.Title className="my-2">Traje Lazio 3 piezas</Card.Title>
            <Card.Text>$1299,00</Card.Text>
          </Card>
        </Link>
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img
              src="https://res.cloudinary.com/donxjonx/image/upload/v1634663817/cavalieri/best_seller_2_knpvfe.jpg"
              alt="Traje Lazio Azul"
            />
            <Card.Title className="my-2">Traje Napoli 3 piezas</Card.Title>
            <Card.Text>$699,00</Card.Text>
          </Card>
        </Link>
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img src="https://res.cloudinary.com/donxjonx/image/upload/v1634663814/cavalieri/best_seller_1_f99kci.jpg" />
            <Card.Title className="my-2">Traje Lazio 3 piezas</Card.Title>
            <Card.Text>$1299,00</Card.Text>
          </Card>
        </Link>
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img src="https://res.cloudinary.com/donxjonx/image/upload/v1634663817/cavalieri/best_seller_2_knpvfe.jpg" />
            <Card.Title className="my-2">Traje Napoli 3 piezas</Card.Title>
            <Card.Text>$699,00</Card.Text>
          </Card>
        </Link>
        <Link
          to="/"
          className="text-decoration-none text-black col-12 col-md-3"
        >
          <Card className="border-0 bg-light">
            <Card.Img src="https://res.cloudinary.com/donxjonx/image/upload/v1634663814/cavalieri/best_seller_1_f99kci.jpg" />
            <Card.Title className="my-2">Traje Lazio 3 piezas</Card.Title>
            <Card.Text>$1299,00</Card.Text>
          </Card>
        </Link>
      </div>
    </section>
  );
}
