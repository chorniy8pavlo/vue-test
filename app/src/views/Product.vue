<template>
  <h1>{{ product.titlePlural }}</h1>
  <div class="grid my-10">
    <div
      class="bg-green-600 h-14"
      v-for="(property, index) in product.properties"
      :key="index"
    >
      <p class="text-sm text-white px-2 py-1" v-if="property.title">
        {{ property.title }}
      </p>
      <select
        class="
          w-full
          bg-green-300
          h-1/2
          hover:bg-green-400
          transition-all
          cursor-pointer
        "
        name=""
        id=""
        v-if="property.title"
        @change="e => onChangeProperty(property.slug, e)"
        v-model="property.activeProperty"
      >
        <option
          :value="option.slug"
          v-for="option in property.options"
          :key="option.name"
          class="option"
          :disabled="option.disabled"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
  <button class="bg-blue-400 text-white px-4 py-2" @click="addToCart">
    Add to cart
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Multiselect from "vue-multiselect";

import { IExclude, IProduct, IProperty } from "@/types/dto";
import store from "../store";

@Options({
  components: { Multiselect }
})
export default class Product extends Vue {
  product: IProduct = {
    sku: "",
    titlePlural: "",
    properties: [],
    excludes: []
  };
  mounted(): void {
    this.product = store.getters.getProductBySku(this.$route.params.product);
  }
  onChangeProperty(): void {
    this.resetProperties();
    this.product.properties.map(property => {
      this.product?.excludes?.map(exclude => {
        if (!this.isPropertyExcluded(exclude, property)) return;
        exclude.map(subExclude => {
          this.product.properties.map(excludeProperty => {
            if (excludeProperty.slug == subExclude.property)
              excludeProperty.options.map(excludeOption => {
                if (
                  subExclude.options.includes(excludeOption.slug.toString()) &&
                  property.slug != subExclude.property
                )
                  return (excludeOption.disabled = true);
              });
          });
        });
      });
    });
  }
  resetProperties(): void {
    this.product.properties.map(property =>
      property.options.map(option => (option.disabled = false))
    );
  }
  isPropertyExcluded(exclude: IExclude[], property: IProperty): boolean {
    return (
      exclude.filter(
        subExclude =>
          subExclude.property == property.slug &&
          subExclude.options.includes(property.activeProperty)
      ).length > 0
    );
  }
  addToCart(): void {
    store.dispatch("addToCart", this.product);
    console.log(store.state.cart);
  }
}
</script>

<style>
.grid {
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 25px;
  row-gap: 25px;
}
</style>
