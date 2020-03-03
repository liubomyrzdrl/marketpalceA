import { types, getRoot, getParent } from "mobx-state-tree";
import { MessageModel } from "./MessageModel";
import { MessageSchema, MessageCollectionSchema } from "../schemas";
import { asyncModel } from "../utils";
import Api from "../../api";
 

export const MessagesStore = types.model('MessagesStore', {
    items: types.array(types.reference(MessageModel)),
    fetch:  asyncModel(fetchMessages),
})
.views((store) => ({
    get asList() { 
        return   store.items.slice().reverse();
    },
    get chatId() {
        return getParent(store).id;
},
}))
.actions(store => ({
    addMessage(message) {
        const result = getRoot(store).entities.normalize(message, MessageSchema);
        store.items.unshift(result);
    },
  
    runInAction(cb) {
        cb(store);
    },
}));


function fetchMessages () {
    return async function fetchMessagesFlow (flow, store) {       
        const res = await Api.Chats.getMessages(store.chatId);
         console.log(res.data);
       const result = flow.merge(res.data, MessageCollectionSchema);

       store.runInAction((self) => {
           self.items = result;
       });

    };
}