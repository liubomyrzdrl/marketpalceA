import React, { useState } from 'react';
import Modal from 'react-modal';


export function TestModal() {   
   const [open, setIsOpen] = useState(true);

   function handleClose() {
       setIsOpen(false);
   }
    return (       
      <div>
        <Modal
          isOpen={open}         
          onRequestClose={handleClose}
        >
          <h4>TestContainer</h4>    
          <button type="button" onClick={handleClose}>Close</button>      
        </Modal>
      </div>
    );
}
