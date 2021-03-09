import React, { useState } from 'react';
import Modal from 'react-modal';
import { ProductForm } from '../../component/Product/component/ProductForm';
import { useHistory } from 'react-router-dom';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
 
    },
  };
 

function ModalAddProduct() {
    const [isOpen, setIsOpen] = useState(true);
    const history = useHistory();

    function handleOpen() { 
          setIsOpen(true);   
    }

    function handleClose(evt) {
      // evt.stopPropagation();
      // history.goBack();
        setIsOpen(false);         
    }

    function handleCloseM(evt) {
      evt.stopPropagation();
      history.goBack();
           
    }

    return (        
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
      >
        <div>Sell Modal</div>
        <button onClick={handleCloseM}>Close</button>>
        {/* <ProductForm  />        */}
      </Modal>
    
    );
}

export default ModalAddProduct;