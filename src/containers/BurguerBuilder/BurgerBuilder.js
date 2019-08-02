import React, { Component } from "react";

// axios instance
import axios from "../../axios-order";

// hoc
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

// components
import Burger from "../../components/Burguer/Burger";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentWillMount() {
    axios
      .get("https://react-my-burger-90286.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      }).catch((error) => {
        this.setState({error: true})
      });
  }

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
    this.setState({ purchasable: sum > 0 });
  };

  purshaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purshaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purshaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    // Create an inmutable copy of the ingredients
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      // For every key check if it's true or false depending f it's bigger than the ingredients
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burguer = this.state.error? <p>Ingredients can't be loaded!</p>:<Spinner />;
    if (this.state.ingredients) {
      burguer = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purshaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purshaseContinue={this.purshaseContinueHandler}
          purshaseCancel={this.purshaseCancelHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
export default withErrorHandler(BurgerBuilder, axios);
