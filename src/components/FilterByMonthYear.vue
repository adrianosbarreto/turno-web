<template>
  <v-select
    v-model="selected"
    variant="underlined"
    class="selection-input"
    menu-icon="mdi-chevron-down"
    hide-details
    :items="items"
    :item-title="item => item.monthYear"
    :item-value="item => item"
  >
  </v-select>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
  import {storeToRefs} from "pinia";
  import useTransactionStore from "@/store/TransactionStore";
  import {getLast12Months} from "@/util/DateFormat";

  const transactionStore = useTransactionStore();

  const { month, year } = storeToRefs(transactionStore);

  interface ItemData {
    monthNumber: number,
    monthYear: string,
    year: number,
  }

  // interface Data {
  //   fontSize: string;
  // }

  // const props = defineProps<Partial<Data>>();

  const items : ItemData[] = getLast12Months();

  const selected = ref<ItemData>(items[0]);

watch(
  () => selected.value,
  (newItem) => {
    if (newItem) {
      console.log(newItem)

      month.value = newItem.monthNumber;
      year.value = newItem.year;

      transactionStore.fetchTransactions(4);
    }
  },
  { immediate: true }
);


</script>

<style scoped lang="scss">
  :deep(.v-select) .v-select__selections input {
    display: none;
  }

  :deep(.v-field__outline) {
    display: none;
  }

  :deep(.v-select__selection-text){
    font-size: 1.2rem;
    font-weight: 600;
  }

</style>
