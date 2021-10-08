<template>
  <h1>Products</h1>
  <div class="grid gap-4 pt-4">
    <router-link
      class="
        h-28
        bg-green-500
        text-white
        flex
        items-center
        justify-center
        text-xl
        hover:bg-green-400
        transition-all
        cursor-pointer
      "
      v-for="(product, index) in products"
      :key="index"
      :to="{ name: 'product', params: { product: product.sku } }"
    >
      {{ product.sku }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { IProduct } from "@/types/dto";
import { Vue } from "vue-class-component";
import store from "../store";

export default class Products extends Vue {
  products: IProduct[] = [];
  mounted(): void {
    this.products = store.state.products;
  }
}
</script>

<style scoped>
.grid {
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
