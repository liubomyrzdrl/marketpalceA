import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Main } from './Main/Main';
import { Login } from './Login/Login';
import { ProductSearch } from './ProductSearch/ProductSearch';
import Register from './Register/Register';
import { ProductFaivorites } from './ProductFaivorites/ProductFaivorites';
import { AddProduct } from '../component/Product/AddProduct/AddProduct';
import { PrivateRoute } from './Auth/components/PrivateRoute';
import { EditeProfile } from './Profile/EditeProfile';
import TestContainer from '../component/TestModal/TestContainer';


export const routes = {
    home: '/',
    login: '/auth/login',
    register: '/auth/register',
    auth: '/auth',    
    product: '/products/:productId', 
    newProduct: '/prod/new',
    searchProd: '/search/:text',
    users: '/users/:userId',
    editeProfile: '/profile/edite',
    // inbox: '/inbox/:chatId',
    chat: '/inbox/:chatId',
    // eslint-disable-next-line no-dupe-keys
    inbox: '/inbox', 
    faivorites: '/faivorites',
    testModal: '/testModal',

};

function Router() {


  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={routes.login} component={Login} />
        <PrivateRoute path={routes.register} component={Register} />
        {/* <Route path={routes.login} component={Login} />  */}
        {/* <Route path={routes.register} component={Register} />  */}
        <Route path={routes.searchProd} component={ProductSearch} />
        <Route path={routes.editeProfile} component={EditeProfile} />
        <Route path={routes.faivorites} component={ProductFaivorites} />
        <Route path={routes.newProduct} component={AddProduct} />
        <Route path={routes.testModal} component={TestContainer} />
        <Route exact component={Main} />         
      </Switch>
    </BrowserRouter>
  );
}

export default Router;