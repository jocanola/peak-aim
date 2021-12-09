import React, { useState, useEffect } from "react";
import "./Home.css";
import { db } from "../firebase";
// import smartshop from "../media/smartshop.png";
import concrete from "../media/concrete.jpg";
import blockimg from "../media/block image.jpg";
import metalrod from "../media/metalrod.jpg";
// import cements from "../media/cements.jpg";
// import Product from "./Product";
// import Searchproduct from "./Searchproduct";
// import Category from "./Category";
import { Link, useHistory } from "react-router-dom";
import ProductOverview from "./ProductOverview";
import Header from "./Header";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [search, setSearch] = useState();
  const [updateProduct, setUpdateProduct] = useState([products]);

  const history = useHistory();

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          product: doc.data(),
        }))
      );
    });

  });

  var updatedproduct = function () {
    setUpdateProduct(
      products.filter((product) => {
        return product?.product.productname
          .toLowerCase()
          .includes(searchField.toLowerCase());
      })
    );
  };
  const strategy = {
    onSearchChange: function onSearchChange(e) {
      setSearchField(e.target.value);
      setSearch(true);
    },
    onSortFromHighToLow: function onSortFromHighToLow() {
      updatedproduct = products.sort(function (a, b) {
        const y = b.product.productprice;
        const x = a.product.productprice;
        return Number(y) - Number(x);
      });
      console.log(updatedproduct);
    },
  };

  // const navigateToEachCategory = function (order) {
  //   history.replace(`/${order}`);
  // };
  // const handleSortHighToLow = filteredproduct.product.productprice

  return (
    <section className="home">
      {/* <div className="home__leftside">
          <img className="home__image" src={smartshop} alt="smartshop" />
        </div>
        <div className="home__rightside">
          <h4>
            We make an incredible products everyone to buy with easy, purchase
            your own and will be delivered to your door step.
          </h4>
          <Searchproduct onSearchChange={strategy.onSearchChange} />
          <button onClick={strategy.onSortFromHighToLow}>sort product</button>
        </div>
       */}
      <Header />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={metalrod} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={blockimg} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={concrete} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <div id="notshow">
        <ProductOverview updateProduct={updateProduct} />
      </div> */}
    </section>
  );
}

export default Home;
