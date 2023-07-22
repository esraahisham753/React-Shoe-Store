import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fetch } from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { CartContext } from "./cartContext";

export default function DetailWrapper() {
  const { id } = useParams();

  return <Details id={id} navigate={useNavigate()} />;
}

class Details extends React.Component {
  state = {
    sku: "",
  };

  render() {
    const { id, navigate } = this.props;
    const { sku } = this.state;

    return (
      <CartContext.Consumer>
        {({ dispatch }) => {
          return (
            <Fetch url={`products/${id}`}>
              {(product, loading, error) => {
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
                        this.setState({ sku: e.target.value });
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
                          this.context.dispatch({ type: "add", id, sku });
                          navigate("/cart");
                        }}
                        disabled={sku ? false : true}
                      >
                        Add to Cart
                      </button>
                    </p>
                    <img
                      src={`/images/${product.image}`}
                      alt={product.category}
                    />
                  </div>
                );
              }}
            </Fetch>
          );
        }}
      </CartContext.Consumer>
    );
  }
}
