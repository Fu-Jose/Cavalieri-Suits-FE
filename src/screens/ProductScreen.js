import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Product from "../components/Products/Product.jsx";
import Loading from "../components/Loading";
import { BiSearch } from "react-icons/bi";
import { getProducts as listProducts } from "../redux/actions/productsActions";

const ProductScreen = (req) => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  const [searchTerm, setSearchTerm] = useState("");

  const category = req.location.pathname.substring(10);

  useEffect(() => {
    dispatch(listProducts(category));
  }, [dispatch, category]);

  return (
    <div className="container my-3">
      <Helmet>
        <title>Cavalieri Suits | Productos</title>
        <meta
          name="description"
          content="Compra los mejores trajes a la medida, camisas, pantalones y zapatos italianos importados"
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="row mx-auto">
          <div className="d-flex text-center mb-3">
            <div className="col-6 mx-auto">
              <div className="position-absolute btn">
                <BiSearch />
              </div>
              <input
                className="searchbar btn btn-light bg-white border"
                placeholder="Buscar..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row border-start border-end mx-auto p-3">
            {products
              .filter((product) => {
                if (searchTerm === "") {
                  return product;
                } else if (
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return product;
                }
                return null;
              })
              .map((product, index) => (
                <div className="col-sm-6 col-md-4 col-lg-2" key={index}>
                  <Product
                    key={index}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    imageUrl={product.imageUrl[0]}
                    category={product.category}
                    countInStock={product.countInStock}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
