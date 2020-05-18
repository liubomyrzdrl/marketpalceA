import axios from 'axios';


// axios.defaults.baseURL = ''

export const Auth = {
 _token: null,

 setToken(token) {
    this._token=token;
    window.localStorage.setItem('___token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;    
 },

isLoggedIn() {
 return !!this._token;
},

 
login({ email, password }) {
    return axios.post('/ap/auth/login', {
        email,
        password,
    });
  },
logout () {
        this._token= null;   
        window.localStorage.removeItem('___token');
        axios.defaults.headers.common.Authorization = undefined;        
  },
  register({ fullName, email, password }) {
    return axios.post('/ap/auth/register', {
      fullName,
      email,
      password,
    });
  },
};

export const Account = {
  getUser() {
        return axios.get('/ap/account');
  },
};

export const Products = {
  // fetchLatest() {
  //   return axios.get('/ap/products/latest');
  // },
  createNewProduct(title, description, photos, location, price) {
    return axios.post('/ap/products',{
      title,
      description,
      photos,
      location,
      price,
    });
  },

  fetchLatest(limit) {
    return axios.get(`/ap/products/latest?limit=${limit}`);
  },

  fetchLatestPagiantion(id,limit) {    
    return axios.get(`/ap/products/latest?from=${id}&limit=${limit}`);
  },

  getById(id) {
    return axios.get(`/ap/products/${id}`);
  },

  byUserId(id) {
    return axios.get(`/ap/users/${id}/products`);
  },

  getProductsSearch(text){
    return axios.get(`/ap/products/search?keywords=${text}`);
  },

  addProductToFavorites (id) {
   const res=  axios.post(`/ap/products/${id}/saved`);
   return res;
  },

  deleteProductFromFavorites (id) {
    const res = axios.delete(`/ap/products/${id}/saved`);
    return res;
   },

   getArrayProductsFavorites () {
     return axios.get('ap/products/saved',);
  }, 

  addArrayProductsFavorites (arg) {
   const res = axios.post('/ap​/products/saved',{       
      data: {
        ids: arg,   
      },         
   },);
    return res;
 }, 

 arrayToDataBase(arg) {
  return axios.post('/ap/products/saved',{
    ids: arg, 
  });
},
 };


 export const Users = {
   getById(id){
    return axios.get(`/ap/users/${id}`);
   },
 };

 export const Chats = {
  createChat(id, message) {
    return axios.post(`/ap/products/${id}/createChat`,{
      message,
    });
  },
  getList() {
     return axios.get('/ap/chats');
  },
  sendMessage(id, message) {
    return axios.post(`/ap/chats/${id}/messages`,{
      message,
    });
  },
  getMessages(id){
    return axios.get(`/ap/chats/${id}/messages`);
  },
 };

