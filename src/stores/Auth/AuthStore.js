import { types, getParent, getRoot } from "mobx-state-tree";
import { Auth, Account } from "../../api/Api";
import { asyncModel } from '../utils';



function loginFlow({ email, password }) {
    return async function loginFlowFetch (flow) {
        try {
            const res = await Auth.login({ email, password });
            Auth.setToken(res.data.token);
            getRoot(flow).viewer.setViewer(res.data.user);
            getParent(flow).setIsLoggedIn(true);  

        }catch(err) {
            console.log(err);
        }      
    };
};

export const AuthStore = types.model('AuthStore', {
    login: asyncModel(loginFlow),
    isLogin: false,
})
.actions((store) => ({
    setIsLoggedIn(value){
        store.isLogin = value;
    },
    logout() {
        store.isLogin = false;
        Auth.logout();
    },
}));

