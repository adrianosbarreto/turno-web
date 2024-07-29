<template>
  <v-btn class="transaction-button-add" variant="flat" density="default" @click="props.action" icon="mdi-plus" >
  </v-btn>
  <v-btn density="default" icon="mdi-open-in-new"></v-btn>
</template>

<script setup lang="ts">
  interface AddButton {
    action : () => void | Promise<void>;
  }

  const props = defineProps<Partial<AddButton>>();

</script>

<style scoped lang="scss">
.transaction-button-add {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 0;
  color: #FFFFFF;
  background-color: #2799fb;
}

:deep(.mdi-plus){
  font-size: 2.5rem;
}
</style>
