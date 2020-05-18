import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { onSnapshot, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { useStore } from '../../stores/createStore';
import s from './Home.module.scss';
import { Loader } from '../../component/Loader/Loader';
import { Product } from '../../component/Product/Product';
import { routes } from '../routes';
import { useHistory } from 'react-router-dom';


const Home = () =>  {
   const store = useStore();    
   const limit = 8;
   const history = useHistory();
   const modalAddProduct  = window.localStorage.getItem('modalAddProduct');


   if (modalAddProduct === 'true') {            
      history.push(routes.newProduct);
   }
   
   const ID = store.latestProducts.items[ store.latestProducts.items.length -1];
     useEffect(() => { 
           if( store.auth.isLogin === true ){ 
            const fetchMoreLogin = window.localStorage.getItem('fetchMoreLogin');
            // const snapshot = window.localStorage.getItem('favs');  
               if(fetchMoreLogin === limit || !fetchMoreLogin) {
                //  store.latestProducts.fetchLatest.run(fetchMoreLogin); 
                store.latestProducts.fetchLatest.run(limit);
               }else{
                store.latestProducts.fetchLatest.run(fetchMoreLogin); 
               }
             
           } else {
            const snapshot = window.localStorage.getItem('favs');
              if(!snapshot){
                store.latestProducts.fetchLatest.run(limit);
              } else {
                applySnapshot(store,JSON.parse(snapshot));  
              }
          }
        
      },[]);     
  

    function handleAddMoreProducts () {   
      if( store.auth.isLogin === true) {    
         const fetchMoreLogin = window.localStorage.getItem('fetchMoreLogin');
        
        window.localStorage.setItem('fetchMoreLogin',(+fetchMoreLogin+limit) );
        store.latestProducts.fetchLatestAdditional.run(ID.id,limit);  
      } else {
        window.localStorage.setItem('fetchMore',ID.id);
        store.latestProducts.fetchLatestAdditional.run(ID.id,limit);         }
    }

const handleFavorite = id => evt => {
 
  if( store.auth.isLogin === true ){
 console.log('handleFavorite');
  } else {
    onSnapshot(store, (snapshot) => {
      window.localStorage.setItem('favs',
      JSON.stringify({  
        auth: {
          isLogin: snapshot.auth.isLogin, 
         },
    viewer: {
        user: snapshot.viewer.user,
    },
         latestProducts: { 
          items: snapshot.latestProducts.items,
        },  
        entities: {
          products: {
            collection: snapshot.entities.products.collection,
          },
        },     
      }));
    });   

  }
  
    };
  return (
    <div className={s.homeWrapper}>  
      <div className={s.homeWrapper__content}>            
        { store.latestProducts.items.map((item) => (
          <Product 
            key={item.id}
            {...item}  
            onClick={handleFavorite(item.id)}
          /> 
           ))}
       
      </div> 
      <div  
        role='button' 
        className={s.more} 
        onClick={handleAddMoreProducts} 
        onKeyDown={handleAddMoreProducts} 
        tabIndex={0}
      >
        { store.latestProducts.fetchLatestAdditional.isLoading ?
          <Loader /> : (
            <img src='more.png' alt='the button to add more products' />
        )}       
      </div>
    </div>
    );
};

export default observer(Home);