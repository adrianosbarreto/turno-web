<template>
  <div class="transaction-list">
    <TransactableItem
      v-for="transaction in props.transactions"
      :transaction="transaction"
      @click="() => navigate(`admin/checks/${transaction.id}`)"
    />
  </div>
</template>

<script setup lang="ts">

import TransactableItem from "@/components/TransactableItem.vue";
import {Transaction} from "@/types/Transaction";
import {useRouter} from "vue-router";


const router = useRouter();

const props = defineProps<{
  transactions: Transaction[],
}>();

function navigate(route: string) : void {
  router.push(route);
}
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
