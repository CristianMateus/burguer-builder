import React, { useState } from "react";

// hoc
import Auxiliary from "../Auxiliary/Auxiliary";

// css
import classes from "./Layout.css";

// Navegation
import Toolbar from "../../components/Navegation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navegation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerState, setSideDrawerState] = useState({
    showSideDrawer: false
  });

  const sideDrawerClosedHandler = () => {
    setSideDrawerState({
      showSideDrawer: false
    });
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }
  
  return (
    <Auxiliary>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer
        open={sideDrawerState.showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

export default Layout;
