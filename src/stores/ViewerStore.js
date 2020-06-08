import { types } from "mobx-state-tree";
import { UserModel } from './Users/UserModel';
import { asyncModel } from "./utils";
import Api from "../api";


const ViewerModel = UserModel.named('ViewerModel');


export const ViewerStore = types.model('ViewerStore', {
    user: types.maybe(ViewerModel),
    updateViewer: asyncModel(updateViewer),
})
.actions((store) => ({
    setViewer(user) {
        store.user = user;
    },
}));

function updateViewer (fullName, avatar, phone) {
    return async function updateViewerFlow(flow, store, Root) {
        try {
            const res = await Api.Account.updateUser(fullName, avatar, phone);
            store.setViewer(res.data);
           
        } catch (error) {
            console.log(error);
        }
    };
}