import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AddProduct } from '../component/Product/AddProduct/AddProduct';
import ModalAddProduct from '../scenes/ModalAddProduct/ModalAddProduct';
import Router, { routes } from './routes';
 
function RouterModal(props) {
    const location = useLocation();
    // debugger;
    let background = location.state && location.state.background;
    
    console.log('location',background);
    return (
      <>        
        {/* <Switch location={background && location}>
          <Route  children={<AddProduct />} /> 
        </Switch> */}
        {background && <Route  children={<ModalAddProduct />} />}
      </>
    );
}

export default RouterModal;