import React from "react";

// hoc
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

// css
import classes from "./Layout.css"

const layout = props => {
  return (
    <Auxiliary>
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

export default layout;
