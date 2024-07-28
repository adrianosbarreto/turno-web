<template>
  <v-list-item class="transaction-item">
    <template v-slot:title>
      <span class="transaction-title">
        {{ props.transaction.description }}
      </span>
    </template>
    <template v-slot:subtitle>
      <span class="transaction-subtitle">
        ${{ props.transaction.amount }}
      </span>
    </template>
<!--    <slot name="button"></slot>-->
  </v-list-item>

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Transaction } from "@/types/Transaction";

const props = defineProps<{
  transaction: Transaction;
}>();

</script>


<style scoped lang="scss">

.transaction {

  &-item {
    color: #2184d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #E0E0E0;
  }

  &-title {
    font-size: 0.8rem;
    font-weight: 700;
  }

  &-subtitle {
    color: #0177dc;
    margin-top: 0.9rem;
    font-size: 1.2rem !important;
    font-weight: 700;
  }

}

:deep(.v-list-item-subtitle){
  opacity: 1;
}

</style>
