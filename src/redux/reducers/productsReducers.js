import * as actionTypes from "../constants/productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        loading: false,
        product: {},
      };
    default:
      return state;
  }
};

export const createProductReducer = (state = { newProduct: {} }, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actionTypes.CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.CREATE_PRODUCT_RESET:
      return { loading: false, product: {} };
    default:
      return state;
  }
};
// const productsReducer = (state = initialState.products, action) => {
//   switch (action.type) {
//     case "FETCH_ALL":
//       return {
//         ...state,
//         inventory: action.payload,
//       };
// case "CREATE":
//   return [...state, action.payload];
//     // case "DELETE":
//     //   return products;
//     default:
//       return state;
//   }
// };

// export default productsReducer;
