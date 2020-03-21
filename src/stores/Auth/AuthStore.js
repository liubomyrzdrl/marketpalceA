import { types, getParent, getRoot } from "mobx-state-tree";
import { Auth, Account } from "../../api/Api";
import { asyncModel } from '../utils';



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
    },
    setisRegister(value){
        store.isRegister = value;
    },  
}));

function loginFlow({ email, password }) { 
    return async function loginFlowFetch (flow,store,root) {
        try {
            const res = await Auth.login({ email, password });      
            root.logmessage.setMessage('OK');
            Auth.setToken(res.data.token);
            getRoot(flow).viewer.setViewer(res.data.user);
            getParent(flow).setIsLoggedIn(true);  
                   
        }catch(err) {
            root.logmessage.setMessage('WRONG_PASSWORD');
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