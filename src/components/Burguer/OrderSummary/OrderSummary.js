import React from "react";

import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
        {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order:</h3>
      <p>A delicios Burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purshaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purshaseContinue}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;
