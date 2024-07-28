<template>
  <v-select
    v-model="selected"
    variant="underlined"
    class="selection-input"
    menu-icon="mdi-chevron-down"
    hide-details
    :items="props.items"
  >
  </v-select>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

  interface ItemData {
    title: string;
  }

  interface Data {
    items: ItemData[];
  }

  const props = defineProps<Partial<Data>>();

  const selected = ref<string | null>(null);

  // Watch props.items and set the first item as the selected value when it changes
  watch(
    () => props.items,
    (newItems) => {
      if (newItems && newItems.length > 0) {
        selected.value = newItems[0].title;
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
</style>
