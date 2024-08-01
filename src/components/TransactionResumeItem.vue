<template>
  <v-list-item class="transaction-item" :style="itemStyle">
    <template v-slot:title>
      <span class="transaction-title" :style="titleStyle">
        {{ props.cardResume.description }}
      </span>
    </template>
    <template v-slot:subtitle>
      <span class="transaction-subtitle" :style="subtitleStyle">
        ${{ props.cardResume.amount }}
      </span>
    </template>
    <template v-slot:append>
      <slot class="transaction-button" name="button"></slot>
    </template>
  </v-list-item>

</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {CardResume} from "@/types/CardResume";

const props = defineProps<{
  cardResume: CardResume;
  color?: string;
  colorSubtitle?: string;
  sizeSubTitle?: string;
  sizeTitle?: string;
  colorTitle?: string;
}>();

const itemStyle = computed(() => ({
  backgroundColor: props.color || '#ffffff',
}));

const titleStyle = computed(() => ({
  color: props?.colorTitle || '#0177dc',
  fontSize: props?.sizeTitle || 0.8,
}));

const subtitleStyle = computed(() => ({
  color: props?.colorSubtitle || '#0177dc',
  fontSize: props?.sizeSubTitle || 1.2,
}));

</script>


<style scoped lang="scss">
.transaction {

  &-item {
    color: #2184d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
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
