import React, { useState } from "react";
import "./form.css";
import ImageUpload from "./ImageUpload";

const AddProductForm = ({ category, addCategory }) => {
  const [id, setId] = useState("");
  const [productname, setProductname] = useState("");
  const [productdesc, setProductdesc] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productrating, setProductrating] = useState("");
  const [getCategoryValue, setGetCategoryValue] = useState("");
  const [getCategory, setGetCategory] = useState("");

  //Adding Product Product image function

  //On selecting Category
  // const selectCategory = (categ) => {
  //   setGetCategory(categ.id);

  //   window.alert("Category Id " + getCategory.id);
  // };
  return (
    <div className="form">
      {/* if add Category is not passed to this component render Add product Form else */}
      {!addCategory ? (
        <>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            value={getCategory}
            onChange={(e) => setGetCategory(e.target.value)}
          >
            {category?.map((categories) => (
              <option key={categories.id} value={categories.id}>
                {categories.name}
              </option>
            ))}
          </select>
          <div className="form__input">
            <h4>id</h4>
            <input
              type="text"
              placehoder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form__input">
            <h4>Product Name</h4>
            <input
              type="text"
              placehoder="Product Name"
              value={productname}
              onChange={(e) => setProductname(e.target.value)}
            />
          </div>
          <div className="form__input">
            <h4>Product Description</h4>
            <input
              type="text"
              placehoder="Product Description"
              value={productdesc}
              onChange={(e) => setProductdesc(e.target.value)}
            />
          </div>
          <div className="form__input">
            <h4>Product Price</h4>
            <input
              type="text"
              placehoder="Product Price"
              value={productprice}
              onChange={(e) => setProductprice(e.target.value)}
            />
          </div>
          <div className="form__input">
            <h4>Product Rating</h4>
            <input
              type="text"
              placehoder="Product Rating"
              value={productrating}
              onChange={(e) => setProductrating(e.target.value)}
            />
          </div>
        </>
      ) : (
        <div className="form__input">
          <h4>Category</h4>
          <input
            type="text"
            placehoder="Product Rating"
            value={getCategoryValue}
            onChange={(e) => setGetCategoryValue(e.target.value)}
          />
        </div>
      )}
      <div className="form__input">
        {addCategory ? (
          <ImageUpload
            id={id}
            productname={productname}
            productdesc={productdesc}
            productprice={productprice}
            productrating={productrating}
            category={getCategory}
            getCategoryValue={getCategoryValue}
            addCategory
          />
        ) : (
          <ImageUpload
            id={id}
            productname={productname}
            productdesc={productdesc}
            productprice={productprice}
            productrating={productrating}
            category={getCategory}
            getCategoryValue={getCategoryValue}
          />
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
