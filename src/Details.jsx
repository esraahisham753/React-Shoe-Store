import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { id } = useParams();
  const { data: product, error, loading } = useFetch("products/" + id);
  const navigate = useNavigate();
  const [sku, setSku] = useState("");

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <PageNotFound />;
  }

  if (error) {
    throw error;
  }

  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
        id="size"
        value={sku}
        onChange={(e) => {
          setSku(e.target.value);
        }}
      >
        <option value="">What Size ?</option>
        {product.skus.map((sku) => {
          return (
            <option value={sku.sku} key={sku.sku}>
              {sku.size}
            </option>
          );
        })}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
