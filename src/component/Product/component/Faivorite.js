import React, { useState } from 'react';
import Icon from '../../Icons/Icon/Icon';
 
import s from './Faivorite.module.scss';
import { useStore } from '../../../stores/createStore';

export function Faivorite({  
                        onSwitch,
                        onClick ,
                        id,
                        saved 
                      }) {
const [isFavorite, setIsFavorite] = useState(saved);

const store = useStore();

function onSwitch (e) {
  setIsFavorite(!isFavorite);
 
  if(store.auth.isLogin === true ){
    if(!isFavorite) {
      //todo add to the favorite
  
        store.favorites.addProductToFavorites.run(id);
     
      store.entities.products.isFavorite(id, !isFavorite);   
         console.log(id, !isFavorite);    
    } else {
      //remove from the favorite
      store.favorites.deleteProductFromFavorites.run(id);
      store.entities.products.isFavorite(id, !isFavorite);   
      console.log(id, !isFavorite);
    }
  } else {
    store.entities.products.isFavorite(id, !isFavorite);   
}

} 

    return (
      <div className={s.faivorite}>
        <div className={s.favoriteContent} onClick={() => { onClick(); onSwitch();}}>
          <div className={s.favoriteContent__oval}>
            <Icon name="oval"   />
          {!isFavorite ? (
            <div className={s.favoriteContent__white}>
              <Icon name="whiteFavotite" />
            </div>
         ) : (
           <div className={s.favoriteContent__white}>
             <Icon name="primaryFavorite" />
           </div>
           )} 
          </div>
        </div>             
      </div>
        
    );
}

