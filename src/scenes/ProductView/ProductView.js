import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useProductCollection } from '../../stores/Products/ProductsCollection';
import { useStore } from '../../stores/createStore';
import UserInfo from './components/UserInfo';

const ProductView =   observer(() => {
  const { productId } = useParams();
   const store = useStore();
  const productCollection =   useProductCollection();
  const product = productCollection.get(productId); 
 
  useEffect(() => {
      if(!product) {
               productCollection.getProduct.run(productId); 
           }
 
  },[]);
  
  if(productCollection.getProduct.isLoading){
      return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Not Found </div>;
  }
    return (  
      <div>              
        <div> {product.title} </div>    
        <UserInfo product={product} />     
      </div>
    );
});

export default ProductView;