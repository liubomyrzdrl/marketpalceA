import { types, getParent } from "mobx-state-tree";
import { ProductModel } from "./ProductModel";
import { asyncModel } from "../utils";
import Api from "../../api";
import { OwnProductShema } from "../schemas";


function fetchOwnProducts () {
    return async function fetchOwnProductsFlow(flow, store) {
      try {
           const res = await Api.Products.byUserId(getParent(store).id);
          console.log(res.data);
          const result  =  flow.merge( res.data.list, OwnProductShema);
          store.setItems(result);
      }catch (err) {
        console.log(err);
      }
        
      
    };
}

export const OwnProductsStore = types.model('OwnProductsStore', {
  items: types.array(types.reference(types.late(() => ProductModel))),
  fetch: asyncModel(fetchOwnProducts),
})
.actions((store) => ({
  setItems(items) {
    store.items= items;
  }
}));