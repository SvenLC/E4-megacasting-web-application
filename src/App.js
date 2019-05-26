import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layouts/Header'
import Casting from './container/Castings/Castings';
import FullCasting from './container/Castings/FullCasting/FullCasting';
import Clients from './container/Clients/Clients';
import FullClient from './container/Clients/FullClient/FullClient';
import Partner from './container/Partners/Partners';
import FullPartner from './container/Partners/FullPartner/FullPartner';
import Job from './container/Jobs/Jobs';
import FullJob from './container/Jobs/FullJob/FullJob';
import Auth from './container/Auth/Auth';
import Contract from './container/Contracts/Contracts';
import FullContract from './container/Contracts/FullContract/FullContract';




class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth}/>
          <Route path="/castings" component={Casting} />
          <Route path="/casting/:id" component={FullCasting} />
          <Route path="/clients" exact component={Clients} />
          <Route path='/client/:id' exact component={FullClient} />
          <Route path='/partners' exact component={Partner} />
          <Route path='/partner/:id' exact component={FullPartner} />
          <Route path='/jobs' exact component={Job} />
          <Route path='/job/:id' exact component={FullJob} />
          <Route path='/contracts' exact component={Contract}/>
          <Route path='/contract/:id' exact component={FullContract}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
