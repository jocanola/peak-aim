import React, { useState, useEffect } from "react";
import { Flipped } from "react-flip-toolkit";
import ReactLoading from "react-loading";
import Product from "./Product";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

function ProductOverview({ updateProduct }) {
  let { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("productscategories")
      .doc(categoryId)
      .collection("products")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });
    console.log(updateProduct);
  }, [updateProduct]);

  if (updateProduct?.length < 1) {
    return (
      <ReactLoading
        type="spinningBubbles"
        color="black"
        height={667}
        width={375}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {products?.map((product) => (
        <Product
          id={product?.product?.id}
          desc={product?.product?.productdesc}
          title={product?.product?.productname}
          price={product?.product?.productprice}
          image={product?.product?.productimg}
          rating={product?.product?.productrating}
        />
      ))}
    </div>
  );
}

export default ProductOverview;
