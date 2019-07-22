import React from 'react';

// components
import Layout from './hoc/Layout/Layout'

// containers
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
