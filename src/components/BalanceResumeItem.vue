<template>
  <v-list-item class="transaction-item">
    <template v-slot:title>
      <span class="transaction-title">
        {{ props.cardResume.description }}
      </span>
    </template>
    <template v-slot:subtitle>
      <span  class="transaction-subtitle">
        {{ cardResumeBalance }}
        </span>
    </template>
    <template v-slot:append>
      <slot class="filter" name="button"></slot>
    </template>
  </v-list-item>

</template>

<script setup lang="ts">
import {computed, defineProps, onMounted} from 'vue';
import {CardResume} from "@/types/CardResume";
import {useAccountStore} from "@/store/AccountStore";

const accountStore = useAccountStore();

const props = defineProps<{
  cardResume: CardResume;
}>();

const cardResumeBalance = computed(() => {
  let value: string;
  if (typeof props.cardResume.amount === "number") {
    value = props.cardResume.amount.toFixed(2);
  } else {
    value = props.cardResume.amount.value.toFixed(2);
  }

  let numberValue = parseFloat(value)
  const literal =  numberValue.toFixed(2);

  if(numberValue < 0){
    return `-$${Math.abs(numberValue).toFixed(2)}`;
  } else {
    return `$${literal}`;
  }
})

onMounted(async () => {
  await accountStore.fetchBalance(
    parseInt(localStorage.getItem('account_id') || '0' ) || accountStore.account_id
  );
});

</script>


<style scoped lang="scss">

$skeleton-loader-background: #BDE0FE;

.transaction {

  &-item {
    background-color: #BDE0FE;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border:none !important;
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
