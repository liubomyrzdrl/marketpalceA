import React from 'react';
import { NavLink,generatePath } from 'react-router-dom';
import uuid from 'uuid/v4';
import { Faivorite }  from './component/Faivorite';
import Skeleton from 'react-loading-skeleton';
import s from './Product.module.scss';
import T from 'prop-types';
import { routes } from '../../scenes/routes';

export function Product ({ 
                           id, 
                           ownerId, 
                           photos, 
                           title,  
                           price,
                           saved,                       
                           onClick,
                        }) {
   return (
     <div className={s.product} key={uuid()}>
              
       <div className={s.product__photo}>
         {console.log(photos)}
         <img 
           alt={ownerId} 
           src={photos=== null ? 'new-product.png' : photos[0]} 
         /> 
       </div>
       <Faivorite onClick={onClick} id={id} saved={saved} />
       <NavLink 
         className={s.navProd}
         to={generatePath(  routes.product, { productId: id } )}
       >     
         <div className={s.product__title}> 
           {' '}
           {title|| <Skeleton />}
         </div>
         <div className={s.product__price}> 
           {' '}
           {price|| <Skeleton />}
         </div>
       </NavLink>  
     </div>
   ); 
}

Product.propTypes  = {
  id: T.number,
  ownerId: T.number, 
  photos: T.array, 
  title: T.string,   
  price: T.number, 
  saved: T.bool,                       
  onClick: T.func, 
};