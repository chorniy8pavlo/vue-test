<template>
  <div class="flex h-screen w-full">
    <div
      id="nav"
      class="
        h-full
        w-3/12
        bg-gray-600
        flex flex-col
        text-lg text-white
        p-8
        space-y-4
      "
    >
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <div class="pl-4 flex flex-col text-base space-y-2">
        <router-link
          v-for="(product, index) in products"
          :key="index"
          :to="{ name: 'product', params: { product: product.sku } }"
          >- {{ product.sku }}</router-link
        >
      </div>
    </div>
    <div class="p-5 w-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "./store";
import { IProduct } from "./types/dto";

export default class Products extends Vue {
  products: IProduct[] = [];
  mounted(): void {
    store.dispatch("fetchProducts");
    this.products = store.state.products;
  }
}
</script>

<style scoped>
#nav .router-link-active {
  color: rgb(16, 185, 129);
}
</style>
