import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/productsActions";

const Forms = ({ mod }) => {
  const [postData, setPostData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    imageUrl: [],
  });
  console.log(mod);
  console.log(postData);
  const product = new FormData();

  useEffect(() => {
    if (mod) {
      console.log("AL");
    }
  });

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    product.append("name", postData.name);
    product.append("description", postData.description);
    product.append("price", postData.price);
    product.append("category", postData.category);
    product.append("countInStock", postData.countInStock);
    for (const file of postData.imageUrl) {
      product.append("imageUrl", file);
    }
    dispatch(createProduct(product));
  };

  return (
    <Container>
      <Form
        className="mx-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Form.Group className="my-3">
          <Form.Label className="m-0">Nombre del producto</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Nombre del producto"
            value={postData.name}
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="m-0">Descripción</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows="3"
            placeholder="Descripción"
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="m-0">Precio</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Precio"
            value={postData.price}
            onChange={(e) =>
              setPostData({ ...postData, price: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="m-0">Categoría</Form.Label>
          <Form.Control
            name="category"
            aria-label="Default select example"
            as="select"
            value={postData.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <option>Escoja una categoría</option>
            <option value="Trajes">Trajes</option>
            <option value="Blazers">Blazers</option>
            <option value="Camisas">Camisas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Calzado">Calzado</option>
            <option value="Cinturones">Cinturones</option>
            <option value="Accesorios">Accesorios</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label className="m-0">Stock</Form.Label>
          <Form.Control
            name="countInStock"
            type="number"
            min="1"
            placeholder="Stock"
            value={postData.countInStock}
            onChange={(e) =>
              setPostData({ ...postData, countInStock: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="formFileMultiple">
          <Form.Label className="m-0">Fotos</Form.Label>
          <br />
          <Form.Control
            type="file"
            name="imageUrl"
            multiple
            onChange={(e) =>
              setPostData({ ...postData, imageUrl: e.target.files })
            }
          />
        </Form.Group>
        <Button className="my-2" variant="primary" type="submit">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : error ? (
            <div>Error en la creación</div>
          ) : success ? (
            <div>Producto creado correctamente</div>
          ) : (
            <>Crear</>
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default Forms;
