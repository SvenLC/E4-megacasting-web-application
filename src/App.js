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
import User from './container/Users/Users';
import FullUser from './container/Users/FullUser/FullUser';
import Article from './container/Articles/Articles';
import FullArticle from './container/Articles/FullArticle/FullArticle';



class App extends Component {

  componentDidMount() {
    if(localStorage.getItem('isAuth') !== 'true' && window.location.pathname !== '/') {
      window.location = '/';
    }
  }

  render() {


    console.log(localStorage.getItem('isAuth'));
    console.log(window.location.pathname);
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth} />
          <Route path="/castings" component={Casting} />
          <Route path="/casting/:id" component={FullCasting} />
          <Route path="/clients" exact component={Clients} />
          <Route path='/client/:id' exact component={FullClient} />
          <Route path='/partners' exact component={Partner} />
          <Route path='/partner/:id' exact component={FullPartner} />
          <Route path='/jobs' exact component={Job} />
          <Route path='/job/:id' exact component={FullJob} />
          <Route path='/contracts' exact component={Contract} />
          <Route path='/contract/:id' exact component={FullContract} />
          <Route path='/users' exact component={User}/>
          <Route path='/user/:id' exact component={FullUser} />
          <Route path='/articles' exact component={Article} />
          <Route path='/article/:id' exact component={FullArticle} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
