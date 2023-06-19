<script setup>
import { NTabs, NTabPane } from "naive-ui";
import ProductItem from "./ProductItem.vue";
const activeTab = ref("hot");
</script>
<template>
  <div class="container">
    <n-tabs v-model:value="activeTab">
      <n-tab-pane name="hot" tab="熱門排行"></n-tab-pane>
      <n-tab-pane name="new" tab="當季新品"></n-tab-pane>
      <n-tab-pane name="sale" tab="熱銷商品"></n-tab-pane>
    </n-tabs>
    <ProductItem :activeTab="activeTab"/>
  </div>
</template>

<style></style>
