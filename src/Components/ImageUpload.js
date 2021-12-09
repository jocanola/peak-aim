import React, { useState } from "react";
import { storage } from "../firebase";
import { db } from "../firebase";

function ImageUpload({
  id,
  productname,
  productdesc,
  productprice,
  productrating,
  category,
  getCategoryValue,
  addCategory,
}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  //Adding Product Product image function
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const pickedImage = e.target.files[0];
      setImage(pickedImage);
    }
  };

  console.log(category);

  const handleUpload = () => {
    if (image?.size < 100000) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progresstracking = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progresstracking);
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    } else {
      setError("the image size is more than 100kb");
    }
  };

  //Adding product to the datastore
  const inputValue =
    (id && productname && productdesc && productprice && productrating) ||
    getCategoryValue;
  const AddingProductToDb = (event) => {
    event.preventDefault();

    if (inputValue !== "") {
      if (!addCategory) {
        db.collection("productscategories")
          .doc(category)
          .collection("products")
          .add({
            id: id,
            productname: productname,
            productdesc: productdesc,
            productimg: url,
            productprice: productprice,
            productrating: productrating,
          });
        // alert(`Adding Product to ${category}`);
        // event.target.value = "";
        return;
      } else {
        db.collection("productscategories").add({
          name: getCategoryValue,
          image: url,
        });
        // alert(`Adding category of value ${url} and ${getCategoryValue}`);
      }
    } else {
      window.alert("enter value");
    }
  };

  // getting Category list from the db

  return (
    <>
      <div className="center">
        <h2 className="green-text">
          {/* {!getCategoryValue ? "Upload product image" : "upload category image"} */}
        </h2>

        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={handleChange} />
          </div>
          {error && <p>{error}</p>}
          <div className="row">
            <progress
              value={progress}
              max="100"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              {" "}
              {progress}{" "}
            </progress>
          </div>
        </div>
        <div>
          <button
            onClick={handleUpload}
            type="button"
            className="btn btn-primary"
          >
            Upload
          </button>
          <button
            type="button"
            className="btn btn-primary mr-3"
            onClick={AddingProductToDb}
          >
            Add
          </button>
        </div>

        <br />
        <img
          src={url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="200"
          width="300"
        />
      </div>
    </>
  );
}

export default ImageUpload;
