import React, { useState, useRef } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import uuid from 'uuid/v4';
import { useHistory } from 'react-router-dom';
import s from './ProductForm.module.scss';
import Icon from '../../Icons/Icon/Icon';
import Api, { ApiUpload } from '../../../api';
import { routes } from '../../../scenes/routes';
import { useStore } from '../../../stores/createStore';

export function ProductForm () {
  
const store =  useStore();
const history = useHistory();
const [title, setTitle] = useState('');
const [file, setFile] = useState('');
const [arrImageURL, setArrImageURL] = useState([]);
const [imagePreviewUrl, setImagePreviewUrl] = useState('');
const [openUpload, setOpenUpload] = useState(false);
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
const [photos, setPhotos] = useState('');
const [price, setPrice] = useState('');
const refs = React.createRef();

    
    async function uploadImage(data) {
     
      try {                                      
      console.log(data);
      const form = new FormData();
      const url = '/ap/upload/images';
      form.append('image',data); 
       setArrImageURL( () => [...arrImageURL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Raffael_046FXD.jpg/800px-Raffael_046FXD.jpg']);
      // Upload image IMAGEBB
    //   const config = {       
    //     method: 'POST',
    //     mode: 'no-cors',
    //     body: form,    
    //     headers: { 
    //       // 'content-type': 'multipart/form-data',   
    //       'access-control-allow-headers': 'Cache-Control, X-Requested-With, Content-Type',
    //       'access-control-allow-methods': 'POST, GET, OPTIONS',
    //       'access-control-allow-origin': '*', 
    //       'timeout': 0,
    //       'processData': false,
    //       'mimeType': 'multipart/form-data',
    //       'contentType': false,
    //     },
    // };
    // const fetchResponse = await fetch('https://api.imgbb.com/1/upload?key=7cb2b38e1114695c432627457b2e75f6', config);    
    // console.log(fetchResponse.json());
  
  // Upload image CLOUDINARY
      const cloudinaryURL = await axios.post(url, form,  { 
        headers: {
        'Content-Type': 'multipart/form-data',
        // 'mimeType': 'multipart/form-data',
      },
    });
    setArrImageURL( () => [...arrImageURL,cloudinaryURL]);
   console.log(cloudinaryURL);

    setOpenUpload(false);
    
      } catch(err) {
        console.log(err);
      }
     }
     function onTitle(e) {
        setTitle(e.target.value);
     }
     function onLocation(e) {
        setLocation(e.target.value);
     }
     function onDescription(e) {
        setDescription(e.target.value);
     }
     function onPhotos(e) {
       e.preventDefault();
       console.log(e);
       const  READER = new FileReader();
       const FILE = e.target.files[0];

  
        // setPhotos(e.target.value);

        READER.onloadend = () => {
            setFile(FILE);
            setImagePreviewUrl(READER.result);
            uploadImage(FILE);
        };
      
        READER.readAsDataURL(FILE);
      
     }
     function onPrice(e) {
        setPrice(e.target.value);
     }
     function handleSubmit(e) {
        e.preventDefault();
        if(store.auth.isLogin === true) {
          console.log('submit');
          console.log(`${title }${ location }${ photos }${  price}`);
          try {
            Api.Products.createNewProduct(title, description, arrImageURL, location, price);
            history.push(routes.home);
          } catch(err) {
            console.log(err);
          }

        } else {
          window.localStorage.setItem('productForCreate', JSON.stringify({
               title,
               description,
               arrImageURL,
               location,
               price, 
          }));
          history.push(routes.register);
        }
     }

     function handleOpenUpload () {
      console.log('Handle add product');
      setOpenUpload(true);
     }

     function handleDeleteImage (image) {      
      const res = arrImageURL.filter(item => item !== image);
      setArrImageURL(res);
        
     }
    return (
      <div className={s.cont}>
        <div className={s.cont__titlePage}>Add product</div>
        <form className={s.cont__form} onSubmit={handleSubmit}>
          <div className={s.cont_title}>
            <div className={`${s.label} ${s.obvious}`}>Title</div>
            <input type="text" onChange={onTitle} />
          </div>
          <div className={s.cont__location}>
            <div className={`${s.label} ${s.obvious}`}>Location</div>
            <input type="text" onChange={onLocation} />
          </div>
          <div className={s.cont__description}>
            <div className={s.label}>Description</div>
            <input type="text" onChange={onDescription} />
          </div>
          <div className={s.cont__photos}>
            <div className={s.cont__photos_content}>
              {arrImageURL.length > 0 && (
                arrImageURL.map(item => {
                  return (
                    <div className={s.choosenImages} key={uuid()}>
                      <div className={s.choosenImages__delete} onClick={() =>  handleDeleteImage(item)}>
                        <Icon name="delete" />
                      </div>
                      <img src={item} alt="product" />
                    </div>
                );
              }))}

              { arrImageURL.length <= 2 && (
              <div className={s.addPhotos} onClick={handleOpenUpload}>
                <Icon name="add" />
              </div>
)}

            </div>
            { openUpload && (
              <div className={s.addPhotos}>
                <input type="file" onChange={onPhotos}  />
              </div>
              )}
                 
          </div>
          <div className={s.cont__price}>
            <div className={s.label}>Price</div>
            <input type="text" onChange={onPrice} />
          </div>
          <button type="submit" disabled={title === '' || location === ''}>Submit</button>
        </form>
      </div>
    );
}