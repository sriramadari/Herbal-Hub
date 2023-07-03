import React from "react";
import {useParams} from "react-router-dom";
function Product({plants}) {
    const { id } = useParams();
    const product = plants[id];
    if(!product) {
      return <span>The product you've requested doesn't exist.</span>;
    }
    const { name,image, description } = product;
    return (
      <div style={{ padding: 20 }}>

        <h3>{name}</h3>
        <img src={image} alt="plant img"></img>
        <p>{description}</p>
      </div>
    );
  }

  export default Product;