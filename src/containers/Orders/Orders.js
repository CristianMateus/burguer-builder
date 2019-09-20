import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios from "../../axios-order";

import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

// import classes from "./Orders.css";

export class Orders extends Component {
  componentDidMount() {
    // Use the service that brings all the orders
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
