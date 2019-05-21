import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layouts/Header'
import Casting from './container/Castings/Castings';
import FullCasting from './container/Castings/FullCasting/FullCasting';
import Clients from './container/Clients/Clients';
import FullClient from './container/Clients/FullClient/FullClient';



class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/castings" component={Casting} />
          <Route path="/casting/:id" component={FullCasting} />
          <Route path="/clients" exact component={Clients} />
          <Route path='/client/:id' exact component={FullClient} />

        </Switch>
      </Layout>
    );
  }
}

export default App;
