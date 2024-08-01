<template>
  <v-list-item class="transaction-item">
    <template v-slot:title>
      <span class="transaction-title">
        {{ props.cardResume.description }}
      </span>
    </template>
    <template v-slot:subtitle>
      <span  class="transaction-subtitle">
        ${{ balance }}
        </span>
    </template>
    <template v-slot:append>
      <slot class="filter" name="button"></slot>
    </template>
  </v-list-item>

</template>

<script setup lang="ts">
import {defineProps, onMounted} from 'vue';
import {CardResume} from "@/types/CardResume";
import {useAccountStore} from "@/store/AccountStore";
import {storeToRefs} from "pinia";

const accountStore = useAccountStore();

const { isLoading, balance } = storeToRefs(accountStore);

const props = defineProps<{
  cardResume: CardResume;
}>();

onMounted(async () => {
  await accountStore.fetchBalance(4);
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
