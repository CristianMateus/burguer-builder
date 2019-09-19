import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios from "../../axios-order";

import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

// import classes from "./Orders.css";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    // Use the service that brings all the orders
    axios
      .get("/orders.json")
      .then(response => {
        // Since I receive a list of objects not an array, I have to
        // loop them and push their data into a created array (fetchedOrders)
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
