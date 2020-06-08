import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useProductCollection } from '../../stores/Products/ProductsCollection';
import { useStore } from '../../stores/createStore';
import UserInfo from './components/UserInfo';
import s from './ProductView.module.scss';
import Icon from '../../component/Icons/Icon/Icon';

const ProductView =   observer(() => {
  const { productId } = useParams();
   const store = useStore();
  const productCollection =   useProductCollection();
  const product = productCollection.get(productId); 
 
  useEffect(() => {
    if(!product) {
      productCollection.getProduct.run(productId); 
    }
    console.log(product);
 
  },[]);
  
  if(productCollection.getProduct.isLoading){
      return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Not Found </div>;
  }
    return (  
      <div className={s.container}>   

        <div className={s.productview}> 
           <div className={s.productview__photos}>
             <img src={product.photos[0] !== null ? product.photos[0] : 'new-product.png' } />
             {/* <img src={product.photos[0] } /> */}
            </div>
           <div className={s.productview__price}>{product.price}</div>
           <div className={s.productview__title}>{product.title}</div>
           <div className={s.productview__location}>
             <span  className={s.location__icon} ><Icon name='location' /></span>
            <span> {product.location}</span>
           </div>
           <div  className={s.productview__line}>
             <Icon name='line' />
           </div>
           <div className={s.productview__description}>{product.description}</div>
        </div>    
        <UserInfo product={product} />     
      </div>
    );
});

export default ProductView;