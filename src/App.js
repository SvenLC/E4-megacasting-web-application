import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layouts/Header'
import Offers from './container/Offers/Offers';
import Clients from './container/Clients/Clients';


class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/offers" component={Offers} />
          {/* <Route path="/offer/:id" component={Offer} /> */}
          <Route path="/clients" exact component={Clients} />
          {/* <Route path='/client/:id' exact component={Client} /> */}

        </Switch>
      </Layout>
    );
  }
}

export default App;