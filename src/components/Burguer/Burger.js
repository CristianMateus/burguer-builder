import React from "react";

// css
import classes from "./Burger.css";

// components
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // Get each individual key
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      // For each key determine the number of props.ingredients according to the key
      // and return a burger ingredient
      // example 2 cheeses = 2 burger ingredients
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please select some ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  );
};

export default burger;
