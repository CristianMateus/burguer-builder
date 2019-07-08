import React from "react";

// Style
import classes from "./Backdrop.css";

const Backdrop = props => {
  return props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null;
};

export default Backdrop;
