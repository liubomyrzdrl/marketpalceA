import React from 'react';
import Header from '../../component/Header/Header';
import { MAIN } from '../../scss/variables.scss';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import  Home  from '../Home/Home';
import ProductView from '../ProductView/ProductView';
import UserView from '../User/UserView';
import InboxView from '../Inbox/InboxView';



export function Main() {
    return (
      <>
        <Header color={MAIN} />    
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.product} component={ProductView} />
          <Route path={routes.users} component={UserView} />
          <Route path={routes.inbox} component={InboxView} />
        </Switch>      
      </>
    );
}