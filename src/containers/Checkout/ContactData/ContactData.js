import React, { Component } from "react";
import axios from "../../../axios-order";

// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

// Styles
import classes from "./ContactData.css";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Cristian Mateus",
        address: { stret: "Dg 40B", zipCode: "32132", country: "Colombia" },
        email: "mateus_09@live.com"
      },
      delivaryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        ></input>
        <input
          className={classes.Input}
          type="text"
          email="email"
          placeholder="Your email"
        ></input>
        <input
          className={classes.Input}
          type="text"
          street="street"
          placeholder="Your street"
        ></input>
        <input
          className={classes.Input}
          type="text"
          postal="postal"
          placeholder="Your postal"
        ></input>
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
