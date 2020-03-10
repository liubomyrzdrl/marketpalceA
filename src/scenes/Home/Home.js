import React, { useEffect } from 'react';
import { useStore } from '../../stores/createStore';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';
import { NavLink, generatePath } from 'react-router-dom';
import { routes } from '../routes';
import { BLACK, TEST } from '../../scss/variables.scss';

const Home =  () =>  {
   const store = useStore();

   
    useEffect(() => {
        store.latestProducts.fetchLatest.run();
    },[]);
      

    if( store.latestProducts.fetchLatest.isLoading){
        return <div>Loading ....</div>;
      }
    return (
      <div> 
 
        <ul>            
          { store.latestProducts.items.map((item) => {
            return (
              <li key={uuid()}>
                <NavLink to={generatePath( routes.product, { productId: item.id } )}>{item.title}</NavLink>  
              </li>
            );
        })}
        </ul> 
      </div>
    );
};
export default observer(Home);