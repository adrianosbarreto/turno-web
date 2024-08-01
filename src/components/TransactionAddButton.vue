<template>
  <v-btn class="transaction-button" variant="flat" :style="itemStyle" @click="props.action">
    <div class="d-flex flex-column align-center justify-center">
      <v-icon size="30" color="#0177DC" :icon="mdiPlus"></v-icon>
      <span class="btn-text">
        {{ props.text}}
      </span>
    </div>
  </v-btn>
</template>

<script setup lang="ts">

  import {computed} from "vue";
  import {mdiPlus} from "@mdi/js";

  interface AddButton {
    icon : string;
    color : string;
    variant : string;
    text : string;
    action : () => void | Promise<void>;
  }

  const props = defineProps<Partial<AddButton>>();

  const itemStyle = computed(() => ({
    backgroundColor: props.color || '#ffffff',
  }));

</script>

<style scoped lang="scss">
  .transaction-button{
    min-width: 150px;

  }

  .btn-text{
    font-size: 0.8rem;
    color: #0177DC;
  }
</style>
