import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';
import { NavLink, generatePath } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import { BLACK, TEST } from '../../scss/variables.scss';
import s from './Home.module.scss';

const Home = () =>  {
   const store = useStore(); 
   const[currentPage, setCurrentPage] = useState(1);  
  
    useEffect(() => {
      // if(currentPage===1) {
      //    store.latestProducts.fetchLatest.run(limit);
      // } else {
      //    store.latestProducts.fetchLatest.run(id,limit);
      // }
        store.latestProducts.fetchLatest.run();
    },[store.latestProducts.fetchLatest]);     

    function handleClick(e) {
      setCurrentPage(+e.target.innerHTML);    
      console.log(currentPage)
    }
    // if( store.latestProducts.fetchLatest.isLoading){
    //     return <div>Loading ....</div>;
    //   }
    return (
      <div className={s.homeWrapper}>  
        <div className={s.homeWrapper__content}>            
          { store.latestProducts.items.map((item) => {
            return (
              <div className={s.product} key={uuid()}>
                <NavLink className={s.navProd} to={generatePath( routes.product, { productId: item.id } )}>
              
                  <div className={s.product__photo}>
                    <img alt={item.ownerId} src={item.photos[0] || <Skeleton />} /> 
                  </div>
                  <div className={s.product__title}> 
                    {' '}
                    {item.title|| <Skeleton />}
                  </div>
                  <div className={s.product__price}> 
                    {' '}
                    {item.price|| <Skeleton />}
                  </div>
                </NavLink>  
              </div>
            );
        })}
        </div> 
      </div>
    );
};

export default observer(Home);