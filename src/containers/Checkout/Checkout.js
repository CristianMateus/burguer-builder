import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";
import { purchaseInit } from "../../store/actions/index";

class Checkout extends Component {
  componentDidMount() {
    this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.push("/");
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.orders.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () =>  dispatch(purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
