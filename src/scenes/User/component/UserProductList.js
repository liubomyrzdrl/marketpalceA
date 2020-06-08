import React, { useEffect } from 'react'; 
import { observer } from 'mobx-react';
import s from './UserProductList.module.scss';
import { Product } from '../../../component/Product/Product';

export const  UserProductList = observer(({ userProduct }) => { 

    useEffect(() =>{
        userProduct.ownProducts.fetch.run();
        // debugger;
    }, [userProduct.ownProducts.fetch]);

    
    if(userProduct.ownProducts.fetch.isLoading ) {    
        return <div>Loading ...</div>;          
      } 
    
    return (
      <div className={s.container}>      
        {userProduct.ownProducts.items.map(item => {
            // console.log(item.title)
            return <Product {...item} />;       
        })}
      </div>
    );  
    
});