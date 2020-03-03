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
get() {
    axios.get('/ap/products/latest')
    .then((response)=>{
          console.log(response);
       return   response;
           })
    .then(data => console.log(data.data));   
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
};

export const Account = {
  getUser() {
        return axios.get('/ap/account');
  },
};

export const Products = {
  fetchLatest() {
    return axios.get('/ap/products/latest');
  },
  getById(id) {
    return axios.get(`/ap/products/${id}`);
  },
  byUserId(id) {
    return axios.get(`/ap/users/${id}/products`);
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