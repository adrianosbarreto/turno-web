<template>
    <v-list-item class="transaction-item"
      :title="props.transaction.description"
      :subtitle="formatDateTime(props.transaction.date) || ''"
    >
      <template v-slot:append>
        <span >
          ${{ props.transaction.amount }}
        </span>
      </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import {Transaction} from "@/types/Transaction";

import formatDateTime from "@/util/DateFormat";

const props = defineProps<{
  transaction: Transaction;
}>();

</script>


<style scoped lang="scss">

  .transaction {

    &-item {
      color: #2799FB;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #E0E0E0;
    }

    &-title {
      font-size: 1rem;
      font-weight: 700;
    }

    &-subtitle {
      font-size: 0.8rem;
      color: #9E9E9E;
    }

    &-amount {
      font-size: 1rem;
      font-weight: 400;
    }
  }

</style>
