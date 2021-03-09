import React from 'react';
import Header from '../../component/Header/Header';
import { MAIN, BLACK, TEST } from '../../scss/variables.scss';
import { Switch, Route, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import  Home  from '../Home/Home';
import ProductView from '../ProductView/ProductView';
import UserView from '../User/UserView';
import InboxView from '../Inbox/InboxView';
import { Footer } from '../../component/Footer/Footer';
import s from './Main.module.scss';
import ModalAddProduct from '../ModalAddProduct/ModalAddProduct';
import { AddProduct } from '../../component/Product/AddProduct/AddProduct';
import { TestModal } from '../../component/TestModal/TestModal';
import { TestContainer } from '../../component/TestModal/TestContainer';

export function Main() {
  let location =  useLocation();
  // let background = location.state && location.state.background;
  let test =  location.state && location.state.test;
                                                   

  console.log('backgrond',location);
 
    return (
      <div className={s.content}> 
        <Header color={BLACK} name="logoWhite" colorFont="white" />    
        <Switch location={test || location}>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.product} component={ProductView} />
          {/* <Route path={routes.searchProd} component={ProductSearch} /> */}
          <Route path={routes.users} component={UserView} />
          <Route path={routes.inbox} component={InboxView} />
          <Route path={routes.newProduct} component={AddProduct} />
          <Route path={routes.testModal} component={TestContainer} />
        </Switch>    
        {/* {background && <Route path={routes.newProduct} children={<ModalAddProduct />} />} */}
        {test && <Route path={routes.testModal} component={TestModal} />}
        <Footer />  
      </div>
    );
}