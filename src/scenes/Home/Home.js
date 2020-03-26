import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';
import { NavLink, generatePath } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useStore } from '../../stores/createStore';
import { routes } from '../routes';
import { BLACK, TEST } from '../../scss/variables.scss';
import s from './Home.module.scss';
import { Loader } from '../../component/Loader/Loader';
 

const Home = () =>  {
   const store = useStore(); 
   const[currentPage, setCurrentPage] = useState(1);  
   const limit = 8;
   const  arrIds = [];
   const  arrIdsPagination = [];
 
   // Add id after first loading page 
   store.latestProducts.items.map(item => (
     arrIds.push(item.id)
   ));

   // Add other loading   
   store.latestProductsPagination.items.map(item => (
    arrIdsPagination.push(item.id)
   ));

    useEffect(() => {   
         setCurrentPage(1);
         store.latestProducts.fetchLatest.run(limit );    

    },[store.latestProducts.fetchLatest]);     

    function handleAddMoreProducts () {   
      if(currentPage===1) { 
        store.latestProductsPagination.fetchLatest.run(arrIds[arrIds.length-1],limit);   
      } else {
        store.latestProductsPagination.fetchLatest.run(arrIdsPagination[arrIdsPagination.length-1],limit); 
      }
      setCurrentPage(currentPage+1);       
    }
  return (
    <div className={s.homeWrapper}>  
      <div className={s.homeWrapper__content}>            
        { store.latestProducts.items.map((item) => {
            // setArrItems(arrItems.push(item.id));
            return (
              <div className={s.product} key={uuid()}>
                <NavLink className={s.navProd} to={generatePath( routes.product, { productId: item.id } )}>              
                  <div className={s.product__photo}>
                    <img alt={item.ownerId} src={item.photos[0]!=='string' ? item.photos[0] : 'new-product.png' || <Skeleton />} /> 
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
        <>
          { store.latestProductsPagination.items.map((item) => {
            return (
              <div className={s.product} key={uuid()}>
                <NavLink className={s.navProd} to={generatePath( routes.product, { productId: item.id } )}>
              
                  <div className={s.product__photo}>
                    <img alt={item.ownerId} src={item.photos[0]!=='string' ? item.photos[0] : 'new-product.png'} /> 
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
        </>
      </div> 
      <div  
        role='button' 
        className={s.more} 
        onClick={handleAddMoreProducts} 
        onKeyDown={handleAddMoreProducts} 
        tabIndex={0}
      >
        { store.latestProductsPagination.fetchLatest.isLoading ?
          <Loader /> : (
            <img src='more.png' alt='the button to add more products' />
        )}       
      </div>
    </div>
    );
};

export default observer(Home);