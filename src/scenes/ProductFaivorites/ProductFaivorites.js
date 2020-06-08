import React, { useEffect } from 'react';
import { observer } from 'mobx-react'; 
import { applySnapshot,onSnapshot   } from 'mobx-state-tree';
import  s from './ProductFaivorites.module.scss';
import SimpleHeader from '../../component/Header/SimpleHeader';
import { Footer } from '../../component/Footer/Footer';
import { BLACK } from '../../scss/variables.scss';
import { Product } from '../../component/Product/Product';
import { useStore } from '../../stores/createStore';


export const ProductFaivorites = observer(() => {
   const store = useStore();
   const  snapshot = window.localStorage.getItem('favs'); 
   const itemFavorite = store.latestProducts.items.filter(item => { 
     return  item.saved === true; 
    });

  useEffect(() => {
    if(store.auth.isLogin === true) {   
           
         store.favorites.getArrayProductsFavorites.run();       
    } else if(snapshot) {
        applySnapshot(store,JSON.parse(snapshot));     
      };
  },[snapshot, store]);

  const handleFavorite =  id => evt => {
    console.log('handle favorite ');
     if( store.auth.isLogin !== true ){
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
      <main>
        <SimpleHeader color={BLACK} name="logoWhite" colorFont="white" />
        <section className={s.faivoritesblock}>
             
          {(store.auth.isLogin && store.favorites.items.length !== 0) ? (
              store.favorites.items.map(item => {
                return <Product {...item} key={item.id} onClick={handleFavorite(item.id)} />;
              })
           ) : <div>Dont have any favorite products</div>}

          {
            snapshot &&
            (itemFavorite.map(item => {
               return  <Product {...item} key={item.id} onClick={handleFavorite(item.id)} />;
             }))
           }                           
        </section> 
        <Footer />
      </main>
    );
});