import React from "react";
import "./ProductTable.css";
import { db } from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";

//Props is passed from Table Row to Render each Row

function Row({
  dataId,
  id,
  productimg,
  productdesc,
  productprice,
  productname,
  productrating,
  username,
  useremail,
  userId,
  category,
  categoryId,
}) {
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  console.log(categoryId);
  function deleteRow() {
    db.collection("productscategories")
      .doc(categoryId)
      .collection("products")
      .doc(dataId)
      .delete();
  }
  return (
    <>
      <tr>
        {id ? <td>{id}</td> : ""}
        {productimg ? (
          <td>{truncateString(productimg, 10)}</td>
        ) : (
          <td>{username}</td>
        )}
        {productdesc ? (
          <td>{truncateString(productdesc, 30)}</td>
        ) : (
          <td>{useremail}</td>
        )}
        {productprice ? <td>{productprice}</td> : <td>{userId}</td>}
        {productname ? <td>{productname}</td> : ""}
        {productrating ? <td>{productrating}</td> : ""}
        <td>
          <DeleteIcon
            onClick={deleteRow}
            style={{ backgroundColor: "white" }}
          />
          
        </td>
      </tr>
    </>
  );
}

export default Row;
