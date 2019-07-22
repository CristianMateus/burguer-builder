import React, { Component } from "react";

// hoc
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

// components
import Burger from "../../components/Burguer/Burger";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purshasable: false,
    purshasing: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurshaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceRemoval = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemoval;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurshaseState(updatedIngredients);
  };

  updatePurshaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purshasable: sum > 0 });
  };

  purshaseHandler = () => {
      this.setState({purshasing: true})
  }

  purshaseCancelHandler = () => {
      this.setState({purshasing: false})
  }

  purshaseContinueHandler = () => {
    alert('Continue ')
  }

  render() {
    // Create an inmutable copy of the ingredients
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      // For every key check if it's true or false depending f it's bigger than the ingredients
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purshasing} modalClosed={this.purshaseCancelHandler}>
          <OrderSummary 
          ingredients = {this.state.ingredients}
          purshaseContinue = {this.purshaseContinueHandler}
          purshaseCancel = {this.purshaseCancelHandler}
          price ={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purshasable={this.state.purshasable}
          ordered={this.purshaseHandler}
        />
      </Auxiliary>
    );
  }
}
export default BurgerBuilder;
