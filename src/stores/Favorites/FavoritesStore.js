import { types } from "mobx-state-tree";
import { asyncModel } from "../utils";
import Api from "../../api";
import { ProductModel } from "../Products/ProductModel";
import { FavoriteProductShema } from "../schemas";

export const FavoritesStore = types.model({
    items: types.array(types.reference(ProductModel)),
    addProductToFavorites: asyncModel(addProductToFavorites),
    deleteProductFromFavorites: asyncModel(deleteProductFromFavorites),
    getArrayProductsFavorites: asyncModel(getArrayProductsFavorites),
    addArrayProductsFavorites: asyncModel(addArrayProductsFavorites),
})
.actions((store) => ({
    setItems(items) {
        store.items = items;
    },
}));

function addProductToFavorites (id) {
    return async function addProductToFavoritesFlow(flow) {
        try {
            const res = await Api.Products.addProductToFavorites(id);
            console.log(res);
        }catch(err) {
            console.log(err);
        }
    };
}

function deleteProductFromFavorites (id) {
    return async function deleteProductFromFavoritesFlow(flow) {
        try {
            const res = await Api.Products.deleteProductFromFavorites(id);
            console.log(res);
        }catch(err) {
            console.log(err);
        }
    };
}

function getArrayProductsFavorites () {
    return async function getArrayProductsFavoritesFlow(flow, store) {
        try {
            const res = await Api.Products.getArrayProductsFavorites();
            const ids = flow.merge(res.data, FavoriteProductShema);            
                store.setItems(ids);
            console.log(res);
        }catch(err) {
            console.log(err);
        }
    };
}


function addArrayProductsFavorites (arg) {
    return async function addArrayProductsFavoritesFlow(flow) {
        try {
            const res = await Api.Products.arrayToDataBase(arg);
            console.log(res);
        }catch(err) {
            console.log(err);
        }
    };
}