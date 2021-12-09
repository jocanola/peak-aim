import React, { useEffect, useState } from "react";
import Category from "./Category";
import { db } from "../firebase";

const CategoryOverview = () => {
  const [getCategory, setGetCategory] = useState([]);

  useEffect(() => {
    db.collection("productscategories").onSnapshot((snapshot) => {
      setGetCategory(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
        }))
      );
    });
  }, []);

  return (
    <div className="container" style={{ width: "80%" }}>
      <div className="row mt-3">
        <center>
          <h1>PRODUCT CATEGORY</h1>
        </center>
      </div>
      <div className="row mt-3">
        {console.log(getCategory)}
        {getCategory?.map((cat) => (
          <Category
            key={cat.id}
            categoryId={cat.id}
            categoryName={cat.name}
            categoryImage={cat.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryOverview;
