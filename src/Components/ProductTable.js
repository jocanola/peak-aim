import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import TableRow from "./TableRow";
import AlertDialogSlide from "./AddProduct";

function ProductTable({
  productList,
  userList,
  products,
  category,
  categoryId,
}) {
  //  const [products, setProducts] = useState([]);
  const [listOfCustomer, setListOfCustomer] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    // db.collection("productscategories")
    //   .doc("category")
    //   .collection("category").onSnapshot((snapshot) => {
    //     setProducts(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         product: doc.data(),
    //       }))
    //     );
    //   });

    db.collection("admin").onSnapshot((snapshot) => {
      setListOfCustomer(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          custList: doc.data(),
        }))
      );
    });
  }, [user]);

  // function deleteRow(items) {
  //   console.log(items[0]?.product);
  // }

  return (
    <div className="table">
      <div className="d-flex">
        <AlertDialogSlide category={category} />
        <AlertDialogSlide addCategory />
      </div>

      {/* {console.log(products)} */}
      <table>
        <thead>
          {productList ? <th>Product Id</th> : ""}
          {productList ? <th>Product Img</th> : <th>Customer name</th>}
          {productList ? <th>Products name</th> : <th>Customer email.</th>}
          {productList ? <th>Product Price (#)</th> : <th>customer Id</th>}
          {productList ? <th> Products desc.</th> : ""}
          {productList ? <th>Product Rating</th> : ""}
        </thead>
        {productList &&
          products.map((product) => (
            <>
              <TableRow
                key={product?.id}
                product={product}
                dataId={product?.id}
                categoryId={categoryId}
              />
            </>
          ))}

        {/* {userList &&
          listOfCustomer.map((custList) => (
            <TableRow key={listOfCustomer?.id} custList={custList} />
          ))} */}
        {/* {console.log(categoryId)} */}
      </table>
    </div>
  );
}

export default ProductTable;
