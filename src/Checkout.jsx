import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useCart } from "./cartContext";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout() {
  const { dispatch } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const STATUS = {
    IDLE: "IDLE",
    ISSUBMITTING: "ISSUBMITTING",
    SUBMITTED: "SUBMITTED",
    COMPLETED: "COMPLETED",
  };
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  // Derived states
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist();
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(event) {
    // TODO
    console.log("in blur");
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
    console.log(touched);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.ISSUBMITTING);
    if (isValid) {
      try {
        //console.log(address);
        await saveShippingAddress(address);
        dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        console.log(e);
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address) {
    let result = {};

    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";

    return result;
  }

  if (saveError) throw saveError;

  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      <div role="alert">
        {!isValid && status === STATUS.SUBMITTED && (
          <ul>
            {Object.keys(errors).map((key) => {
              return <li>{errors[key]}</li>;
            })}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors["city"]}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) &&
              errors["country"]}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.ISSUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
