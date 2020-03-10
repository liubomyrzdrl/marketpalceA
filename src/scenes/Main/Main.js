import React from 'react';
import Header from '../../component/Header/Header';
import { MAIN, BLACK, TEST } from '../../scss/variables.scss';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import  Home  from '../Home/Home';
import ProductView from '../ProductView/ProductView';
import UserView from '../User/UserView';
import InboxView from '../Inbox/InboxView';
import s from './Main.module.scss';


export function Main() {
 
    return (
      <main> 
        <Header color={BLACK} name={'logoWhite'} />    
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.product} component={ProductView} />
          <Route path={routes.users} component={UserView} />
          <Route path={routes.inbox} component={InboxView} />
        </Switch>      
      </main>
    );
}