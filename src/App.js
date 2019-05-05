import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layouts/Header'
import Offers from './container/Offers/Offers';
import Clients from './container/Clients/Clients';
import FullClient from './container/Clients/FullClient/FullClient';
import FullOffer from './container/Offers/FullOffer/FullOffer';


class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/offers" component={Offers} />
          <Route path="/offer/:id" component={FullOffer} />
          <Route path="/clients" exact component={Clients} />
          <Route path='/client/:id' exact component={FullClient} />

        </Switch>
      </Layout>
    );
  }
}

export default App;
