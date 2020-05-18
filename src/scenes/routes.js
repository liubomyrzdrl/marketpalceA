import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Main } from './Main/Main';
import { Login } from './Login/Login';
import { ProductSearch } from './ProductSearch/ProductSearch';
import Register from './Register/Register';
import { ProductFaivorites } from './ProductFaivorites/ProductFaivorites';
import { AddProduct } from '../component/Product/AddProduct/AddProduct';


export const routes = {
    home: '/',
    login: '/auth/login',
    register: '/auth/register',
    auth: '/auth',    
    product: '/products/:productId', 
    newProduct: '/prod/new',
    searchProd: '/search/:text',
    users: '/users/:userId',
    // inbox: '/inbox/:chatId',
    chat: '/inbox/:chatId',
    // eslint-disable-next-line no-dupe-keys
    inbox: '/inbox', 
    faivorites: '/faivorites',

};

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.login} component={Login} /> 
        <Route path={routes.register} component={Register} /> 
        <Route path={routes.searchProd} component={ProductSearch} />
        <Route path={routes.faivorites} component={ProductFaivorites} />
        <Route path={routes.newProduct} component={AddProduct} />
        <Route exact component={Main} />         
      </Switch>
    </BrowserRouter>
  );
}

export default Router;