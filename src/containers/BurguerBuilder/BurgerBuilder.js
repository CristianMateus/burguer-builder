import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// hoc
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

import axios from "../../axios-order";

// components
import Burger from "../../components/Burguer/Burger";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount(){
    this.props.onInitIngredients()
  }

  updatePurshaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purshaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purshaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purshaseContinueHandler = () => {
    this.props.history.push(`/checkout`);
  };

  render() {
    // Create an inmutable copy of the ingredients
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      // For every key check if it's true or false depending f it's bigger than the ingredients
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burguer = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burguer = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurshaseState(this.props.ingredients)}
            ordered={this.purshaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purshaseContinue={this.purshaseContinueHandler}
          purshaseCancel={this.purshaseCancelHandler}
          price={this.props.price}
        />
      );
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purshaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burguer}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(BurgerBuilder), axios));
