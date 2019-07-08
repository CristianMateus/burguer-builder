import React from "react";

// css
import classes from "./BuildControls.css";

// components
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map((control, index) => (
        <BuildControl 
        key={index}
        label={control.label} 
        added={() => props.ingredientAdded(control.type)}
        remove={() => props.ingredientRemoved(control.type)}
        disabled={props.disabledInfo[control.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purshasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
