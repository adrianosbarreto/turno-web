<template>
  <div class="transaction-list">
    <TransactableItem
      v-for="transaction in props.transactions"
      :transaction="transaction"
    />
  </div>
</template>

<script setup lang="ts">

import TransactableItem from "@/components/TransactableItem.vue";
import {Transaction} from "@/types/Transaction";

const props = defineProps<{
  transactions: Transaction[],
}>();


</script>

<style scoped lang="scss">
  .transaction-list{
    overflow-y: scroll;
    height: 100%;

    //remove scrollbar
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }


</style>
