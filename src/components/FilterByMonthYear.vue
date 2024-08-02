<template>
  <v-select
    v-model="selected"
    variant="underlined"
    class="selection-input"
    :menu-icon="mdiChevronDown"
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
  import {getLast12Months} from "@/util/DateFormat";
  import useTransactionStore from "@/store/TransactionStore";
  import {useAccountStore} from "@/store/AccountStore";
  import {mdiChevronDown} from "@mdi/js";


  interface ItemData {
    monthNumber: number,
    monthYear: string,
    year: number,
  }

  const transactionStore = useTransactionStore();

  const accountStore = useAccountStore();

  const { month, year } = storeToRefs(transactionStore);

  const items : ItemData[] = getLast12Months();

  const selected = ref<ItemData>(items[0]);

  const props = defineProps<{
    type: string
  }>();

  watch(
    () => selected.value,
    (newItem) => {
      if (newItem) {

        month.value = newItem.monthNumber;
        year.value = newItem.year;

        if(props.type === 'expense'){
          transactionStore.fetchExpenses(accountStore.account_id, 'expense');
        } else if(props.type === 'income'){
          transactionStore.fetchIncomes(accountStore.account_id, 'income');
        } else if(props.type === 'all'){
          transactionStore.fetchTransactions(accountStore.account_id);
        } else if(props.type == 'check'){
          transactionStore.fetchChecks(accountStore.account_id);
        } else if(props.type == 'check-pending'){
          transactionStore.fetchPendingChecks();
        }

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
