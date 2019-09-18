import React from 'react';
import { Route, Switch } from 'react-router-dom'

// components
import Layout from './hoc/Layout/Layout'

// containers
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route render={() => <div><h1>404 not found :'(</h1></div>}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
