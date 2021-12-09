import React from "react";
// import category1 from "../media/amazonflash.jpg";
import { Link, useHistory } from "react-router-dom";
import "./Category.css";
function Category({ categoryId, categoryName, categoryImage }) {
  return (
    <div className="col-md-4">
      <Link to={`/Category/${categoryId}`}>
        <div className="dcard">
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div
            className="paracard"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${categoryImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no - repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="frame">
              <h2>{categoryName}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Category;
