import React from 'react';
import { observer } from 'mobx-react';
import s from './ModalContainer.module.scss';
import Icon from '../../../component/Icons/Icon/Icon';


 const  ModalContainer =  observer( ({
                      product, 
                      onClick,
                      onChange,
                      value, 
                      setVisible,
}) => {
    console.log(product);

    function handleVisible() {
        setVisible(false);
    }
    return (
      <div className={s.modalcontainer}>

        <div className={s.modalcontainer__contact}>
          <span className={s.modalcontainer__contact__title}>Contact seller</span>
          <div className={s.modalcontainer__contact__close} onClick={handleVisible}>
            <Icon name='delete' />
          </div>
        </div>

        <div className={s.modalcontainer__product}>
          <span className={s.modalcontainer__product__label}>Subject:</span>
          <span>{product.title}</span>
        </div>

        <div className={s.modalcontainer__owner}>
          <div className={s.modalcontainer__owner__avatar}> 
            <img alt="avatar" src={product.owner.avatar !== null ? product.owner.avatar : 'PngItem_786293.png'} />
          </div>

          <div className={s.modalcontainer__owner__information}>
            <div className={s.inf__title}>
              {product.owner.fullName}
            </div>

            <div className={s.inf__location}>
              {product.owner.location}
            </div>
          </div>       
        </div>
        <div className={s.modalcontainer__send}>
          <div className={s.modalcontainer__message}>message</div>
          <textarea 
            type="text"
            value={value}
            onChange={onChange}
            placeholder="For example: Iron man suit"
          />       
          <button type="button" onClick={onClick}> 
            Send Message
          </button>
        </div>
      
      </div>
    );
});
export default ModalContainer;