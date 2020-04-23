import { types, getRoot, getSnapshot } from "mobx-state-tree";
import { asyncModel } from "../utils";
import { UserModel } from '../Users/UserModel';
import Api from "../../api";
import { ChatSchema } from "../schemas";


function createChat (message) {
    return async function createChatFlow(flow, store) {
        let chatId;
        try {
             flow.start();
              const res = await Api.Chats.createChat(store.id, message);
              console.log(res);
              chatId= res.data.id;

              res.data.participants = [getSnapshot(store.owner)];
              flow.merge(res.data, ChatSchema);
              
              flow.success();
            } catch (err) {
                flow.error(err);
                throw err;
        }   
        return chatId;
    };
}


export const ProductModel = types.model('ProductModel',{
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    saved: types.boolean,
    createdAt: types.string,
    updatedAt: types.string,
    // owner: safeReference(types.late(()=>UserModel)) ,
    owner: types.safeReference(types.late(()=>UserModel)),
    createChat: asyncModel(createChat, false),
})
.preProcessSnapshot((snapshot) => (    {
        ...snapshot,
        ownerId: snapshot.ownerId, 
   }
))
.actions((store) => ({
    fetchOwner() {
        getRoot(store).entities.users.getById.run(store.ownerId);
        store.owner = store.ownerId;
    },
}));