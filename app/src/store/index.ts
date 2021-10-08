import { createStore } from "vuex";
import posters from "./mockData/posters.json";
import flyers from "./mockData/flyers.json";
import businesscards from "./mockData/businesscards.json";
import { IProduct } from "@/types/dto";

export default createStore({
  state: {
    products: [] as IProduct[],
    cart: [] as IProduct[]
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    pushToCart(state, payload) {
      state.cart.push(payload);
    }
  },
  actions: {
    fetchProducts(context) {
      const products = [posters, flyers, businesscards];
      context.commit("setProducts", products);
    },
    addToCart(context, product) {
      context.commit("pushToCart", product);
    }
  },
  getters: {
    getProducts: state => {
      return state;
    },
    getProductBySku: state => (sku: string) => {
      return state.products.find((product: IProduct) => product.sku === sku);
    }
  }
});
