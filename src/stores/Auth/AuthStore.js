import { types, getParent, getRoot } from 'mobx-state-tree';
import { Auth, Account } from '../../api/Api';
import { asyncModel } from '../utils';
import Api from '../../api';



export const AuthStore = types.model('AuthStore', {
    login: asyncModel(loginFlow),
    register: asyncModel(registerFlow),
    isLogin: false,
    isRegister: false,
})
.actions((store) => ({
    setIsLoggedIn(value){
        store.isLogin = value;
    },
    logout() {
        store.isLogin = false;
        Auth.logout();
        window.localStorage.removeItem('fetchMoreLogin');
    },
    setisRegister(value){
        store.isRegister = value;
    },  
}));

function loginFlow({ email, password }) { 
    return async function loginFlowFetch (flow,store,Root) {
         
        try {
            const res = await Auth.login({ email, password });  
            const arr = []; 
                   
            Auth.setToken(res.data.token);
            getRoot(flow).viewer.setViewer(res.data.user);
            getParent(flow).setIsLoggedIn(true);  
            Root.logmessage.setMessage('OK');
            const snapshot = window.localStorage.getItem('favs');
            // if(snapshot) {
            //     for(const i in JSON.parse(snapshot).entities.products.collection) {
            //         if(JSON.parse(snapshot).entities.products.collection[i].saved === true ) {
            //             arr.push(JSON.parse(snapshot).entities.products.collection[i].id);
            //         }   
            //     }
            //     console.log(arr);
            //     //todo add ids favorites      
            //     Api.Products.addArrayProductsFavorites(arr);

            // }
         } catch(err) {
            
            Root.logmessage.setMessage('WRONG_PASSWORD');
            console.log(err);
        }      
    };
};

function registerFlow ({ fullName,email,password }) {
    return async function registerFlowFetch(flow,store,root) {
        try {
          const res= await Auth.register({ fullName,email,password });   
          getParent(flow).setisRegister(true); 
          root.logmessage.setMessage('OK');

        }catch(err) {
            console.log(err);
            root.logmessage.setMessage('SOMETHING_GOES_WRONG');
        }
    };
}