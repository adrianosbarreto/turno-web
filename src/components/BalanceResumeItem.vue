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
    <template v-slot:append>
      <slot class="filter" name="button"></slot>
    </template>
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
    background-color: #BDE0FE;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  &-title {
    font-size: 1rem;
    font-weight: 700;
  }

  &-subtitle {
    color: #FFFFFF;
    margin-top: 0.9rem;
    font-size: 1.5rem !important;
    font-weight: 700;
  }
}

:deep(.v-list-item-subtitle){
  opacity: 1;
}

</style>
