import React from "react";
import { saveShippingAddress } from "./services/shippingService";

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

const STATUS = {
    IDLE: "IDLE",
    ISSUBMITTING: "ISSUBMITTING",
    SUBMITTED: "SUBMITTED",
    COMPLETED: "COMPLETED",
  };

export default class Checkout extends React.Component {
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    saveError: null,
    touched: {},
  }

  // Derived states
  isValid(){
  const errors = this.getErrors(this.state.address);
  return Object.keys(errors).length === 0;
  }

  handleChange(e) {
    e.persist();
    this.setState((state) => {
      return { address: {
        ...state.address,
        [e.target.id]: e.target.value,
      }};
    });
  }

  handleBlur(event) {
    // TODO
    console.log("in blur");
    event.persist();
    this.setState((state) => {
      return { touched: { ...state.touched, [event.target.id]: true }};
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({status: STATUS.ISSUBMITTING});
    if (this.isValid()) {
      try {
        await saveShippingAddress(address);
        this.props.dispatch({ type: "empty" });
        this.setState({status: STATUS.COMPLETED});
      } catch (e) {
        this.setState({saveError: e});
      }
    } else {
      this.setState({status: STATUS.SUBMITTED});
    }
  }

  getErrors(address) {
    let result = {};

    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";

    return result;
  }

  if (this.state.saveError) throw this.state.saveError;

  if (this.state.status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping</h1>;
  }
render(){
  return (
    <>
      <h1>Shipping Info</h1>
      <div role="alert">
        {!this.isValid() && this.state.status === STATUS.SUBMITTED && (
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
}
