import Api from "../../api";
import { getParent} from 'mobx-state-tree';

export const ReagisterStore = types.model('ReagisterStore', {
    register: asyncModel(registerFlow),
    isRegister: false,
})
.actions((store) => ({
    setisRegister(value){
        store.isRegister = value;
    },  
}));


function registerFlow ({ fullName,email,password }) {
    return async function registerFlowFetch(flow,store,root) {
        try {
          const res=Api.Auth.register({ fullName,email,password });   
          getParent(flow).setisRegister(true); 
          root.logmessage.setMessage('OK');

        }catch(err) {
            console.log(err);
            root.logmessage.setMessage('SOMETHING_GOES_WRONG');
        }
    };
}