import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import  SimpleHeader from '../../component/Header/SimpleHeader';
import  { BLACK } from '../../scss/variables.scss';
import s from './EditeProfile.module.scss';
import { useStore } from '../../stores/createStore';
import Api from '../../api';
import { routes } from '../routes';

export function EditeProfile () {
   const store =  useStore( );
   const viewer =  useStore(user => user.viewer.user);
   const [upload, setUpload] = useState(false);
   const [fullName, setFullName] = useState(viewer.fullName);
   const [phone, setPhone] = useState(viewer.phone === null ? '' : viewer.phone);
   const [image, setImage] = useState('');
   const [imageCloudUrl, setImageCloudUrl] = useState('');
   const history = useHistory();


   function handleChangeFullName (evt) {
    
       setFullName(evt.target.value);
    }

   function handleChangePhone (evt) {
    setPhone(evt.target.value);   
   }

   function handleSubmit(evt) {
        evt.preventDefault();
      
       store.viewer.updateViewer.run(fullName, imageCloudUrl, phone);
       history.push(routes.home);

   }

   function handleUpgradePhoto () {
     setUpload(true);
   }

 async  function uploadImage(data) {
    try {
      const form = new FormData();
      const url = '/ap/upload/images';
      form.append('image',data); 
    
  
  
      // Upload image CLOUDINARY
      const cloudinaryURL = await axios.post(url, form,  { 
        headers: {
        'Content-Type': 'multipart/form-data',
        // 'mimeType': 'multipart/form-data',
      },
    });
    setImageCloudUrl(cloudinaryURL.data);
    } catch(err) {
        console.log(err);
    }
  
    setUpload(false);
    }

   function handleChangeAvatar(e) {
    e.preventDefault();
    const  READER = new FileReader();
    const FILE = e.target.files[0];

    READER.onloadend = () => {
      setImage(FILE);
      uploadImage(FILE);
  };

    READER.readAsDataURL(FILE);
 }
    return (
      <div className={s.container}>             
        <SimpleHeader color={BLACK} name='logoWhite' />
        <div className={s.editeSection}>
          <div className={s.editeSection__title}>Edite profile </div> 

          <div className={s.editeSection__avatar}>       
            {
              image === '' ? (
                <img alt="avatar" src={viewer.avatar !== null ? viewer.avatar : '/PngItem_786293.png'}  />
              ) : (
                <img alt="avatar" src={imageCloudUrl}  />
              )
            }      
          </div>
          {
            upload ? <input type="file" onChange={handleChangeAvatar} />             
                : (           
                  <div className={s.editeSection__upload} onClick={handleUpgradePhoto}>Upgrade photo</div>      
              
                 )
          }
          
          <form onSubmit={handleSubmit} className={s.editeSection__form}>
            <div className={s.editeSection__inputBlock}>
              <div className={s.editeSection__inputBlock__label}>full name</div>
              
              <input
                type="text"
                onChange={handleChangeFullName} 
                value={fullName} 
                className={s.editeSection__inputBlock__input}
              />
            </div>

            <div className={s.editeSection__inputBlock}>
              <div className={s.editeSection__inputBlock__label}>phone number</div>
              <input  
                type="text"  
                onChange={handleChangePhone} 
                value={phone}
              />
            </div>
            <button type="submit">Save</button>
          </form>

        </div>
      </div>
    );
}