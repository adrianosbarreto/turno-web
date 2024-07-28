<template>
  <v-btn class="transaction-button" variant="flat"
         color="white">
    <div class="d-flex flex-column align-center justify-center">
      <v-icon size="30" color="#2799FB">mdi-plus</v-icon>
      <span class="btn-text">
        {{ props.text}}
      </span>
    </div>
  </v-btn>
</template>

<script setup lang="ts">

  interface AddButton {
    icon : string;
    color : string;
    variant : string;
    text : string;
  }

  const props = defineProps<Partial<AddButton>>();

</script>

<style scoped lang="scss">
  .transaction-button{
    min-width: 150px;

  }

  .btn-text{
    font-size: 0.8rem;
    color: #2799FB;
  }
</style>
