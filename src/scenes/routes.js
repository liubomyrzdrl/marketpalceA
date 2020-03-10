import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Main } from './Main/Main';
import { Login } from './Login/Login';
import { ProductSearch } from './ProductSearch/ProductSearch';


export const routes = {
    home: '/',
    login: '/auth/login',
    auth: '/auth',
    register: '/auth/register',    
    product: '/products/:productId',    
    searchProd: '/search/:text',
    users: '/users/:userId',
    // inbox: '/inbox/:chatId',
    chat: '/inbox/:chatId',
    // eslint-disable-next-line no-dupe-keys
    inbox: '/inbox', 

};

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.login} component={Login} /> 
        <Route path={routes.searchProd} component={ProductSearch} />
        <Route exact component={Main} />         
      </Switch>
    </BrowserRouter>
  );
}

export default Router;