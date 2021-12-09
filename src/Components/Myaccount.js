import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProductTable from "./ProductTable";
// import displayPhoto from "../media/avatar.jpg";
import Orders from "./Orders";
import Personaldata from "./Personaldata";
import "./Myaccount.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { db } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

function Myaccount({
  admin,
  PermIdentityIcon,
  ShoppingBasketIcon,
  PeopleOutlineIcon,
  ViewListIcon,
}) {
  const [ordershow, setOrdershow] = useState(false);
  const [productshow, setProductshow] = useState(true);
  //Handle user as state
  const [{ user }] = useStateValue();
  const history = useHistory();

  //Handle the signout
  const handleSignOut = () => {
    if (user) {
      auth.signOut();
      history.push("/");
    }
  };
  //Showing different categories of products
  const [products, setProducts] = useState([]);
  const [listOfCustomer, setListOfCustomer] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [category, setCategory] = useState("category");
  const productCategories = db.collection("productscategories");

  useEffect(() => {
    productCategories.onSnapshot((snapshot) => {
      setGetCategory(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });

    db.collection("productscategories")
      .doc(category)
      .collection("products")
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }))
        );
      });

    db.collection("admin").onSnapshot((snapshot) => {
      setListOfCustomer(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          custList: doc.data(),
        }))
      );
    });
  }, [user, category]);

  function deleteCategory(categoryId) {
    db.collection("productscategories").doc(categoryId).delete();
    // console.log(categoryId);
  }

  return (
    <div className="account">
      {/*Side Bar */}
      <div className="account__sidebar">
        <div className="account__avatar">
          <Avatar
            alt="Avatar"
            src="https://launchwebsitedesign.com/wp-content/uploads/2017/09/josh-d-avatar.jpg"
            className="MuiAvatar-img"
          />
        </div>
        <div className="account__displayname">
          <h2>{admin ? null : "Jokanola"}</h2>
        </div>

        <div className="account__link">
          {PermIdentityIcon ? (
            <div
              className="account__linkprofile"
              onClick={() => setOrdershow(false)}
            >
              <PermIdentityIcon className="account__linkicon" />{" "}
              <h4>Profile</h4>
            </div>
          ) : (
            ""
          )}

          {ShoppingBasketIcon ? (
            <div
              className="account__linkprofile"
              onClick={() => setOrdershow(true)}
            >
              <ShoppingBasketIcon className="account__linkicon" />
              <h4>Orders</h4>
            </div>
          ) : (
            ""
          )}

          {admin ? (
            <div
              className="account__linkprofile"
              onClick={() => setProductshow(false)}
            >
              <PeopleOutlineIcon className="account__linkicon" />
              <h4>Users</h4>
            </div>
          ) : (
            ""
          )}
          <div className="account__productcategory">
            {admin &&
              getCategory?.map((category) => (
                <div className="account__linkprofile">
                  <ViewListIcon className="account__linkicon" />
                  <h4 onClick={() => setCategory(category.id)}>
                    {category.name}
                  </h4>
                  <DeleteIcon
                    onClick={() => deleteCategory(category?.id)}
                    
                  />
                </div>
              ))}
          </div>

          <Link to={!user && "/login"} style={{ color: "white" }}>
            <div className="account__linkprofile">
              <ExitToAppIcon
                className="account__linkicon"
                onClick={handleSignOut}
              />
              <h4>SignOut</h4>
            </div>
          </Link>
        </div>
      </div>

      {/*Render Manage User, Adding product if admin else Order and profile*/}

      {!admin ? (
        <div className="account__profile">
          {ordershow ? <Orders /> : <Personaldata />}
        </div>
      ) : (
        <div className="account__profile">
          {productshow ? (
            <ProductTable
              productList
              products={products}
              category={getCategory}
              categoryId={category}
            />
          ) : (
            <ProductTable userList />
          )}
        </div>
      )}
    </div>
  );
}

export default Myaccount;
