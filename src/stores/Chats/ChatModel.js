import { types, getRoot } from "mobx-state-tree";
import { ProductModel } from "../Products/ProductModel";
import { UserModel } from "../Users/UserModel";
import { MessageModel } from "./MessageModel";
import Api from "../../api";
import { MessageCollectionSchema, MessageSchema } from "../schemas";
import { asyncModel } from "../utils";
import { MessagesStore } from "./MessagesStore";

export const ChatModel = types.model('Chat',{
    id: types.identifierNumber,
    productId: types.number,
    ownerId: types.number,
    createdAt: types.string,
    updatedAt: types.string,
    product: types.safeReference(ProductModel),
    message: types.safeReference(MessageModel),
    messages: types.optional(MessagesStore, {}),
    user: types.safeReference(UserModel),
    sendMessage: asyncModel(sendMessage),
})
 .preProcessSnapshot((snapshot)=> {
     if (typeof snapshot !==  'object') {
        return snapshot;
     }

     if (typeof snapshot.participants === 'undefined') {
        console.log(snapshot);
     }
     return {
         ...snapshot,
        product: snapshot.product ||  snapshot.productId, 
        participants: undefined,
        user: snapshot.participants[0],  
     };     
 });


 function sendMessage (text) {
     return async function sendMessageFlow (flow, store) {
         try {
            const res =  await Api.Chats.sendMessage(store.id, text);
            console.log(res.data);
     
            //    debugger;
            store.messages.addMessage(res.data);
            const result  = flow.merge(res.data, MessageCollectionSchema);
               
               
             console.log('result');
             console.log(result);
     
        
           
         } catch (err) {
            console.log(err);
         }
     };
 };