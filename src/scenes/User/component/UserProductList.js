import React, { useEffect } from 'react'; 
import { observer } from 'mobx-react';
import { UsersCollection, useUsersCollecction } from '../../../stores/Users/UsersCollections';
import uuid from 'uuid/v4';

export const  UserProductList = observer(({ userProduct }) => { 
const coll = useUsersCollecction();
    useEffect(() =>{
        userProduct.ownProducts.fetch.run();
        // debugger;
    }, []);

    
    if(userProduct.ownProducts.fetch.isLoading ) {    
        return <div>Loading ...</div>;          
      } 
    
    return (
      <>
        <div> Product List </div>
        {}
        {userProduct.ownProducts.items.map(item => {
            // console.log(item.title)
            return (
              <div key={uuid()}>
                <div>{item.title}</div>
              </div>
            );
        })}
      </>
    );  
    
});