import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "../reducers/cartReducers";
import { getUserInfoReducer } from "../reducers/userReducers";
import {
  getProductsReducer,
  getProductDetailsReducer,
  createProductReducer,
} from "../reducers/productsReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
} from "../reducers/ordersReducers";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["userInfo", "cart"],
};

const bigReducer = combineReducers({
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  newProduct: createProductReducer,
  cart: cartReducer,
  userInfo: getUserInfoReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
