<template>
  <v-text-field
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components'
</script>

<style scoped lang="scss">

$height_input: 3rem;

.v-input {
  border-radius: 2rem;

  :deep(.v-field__overlay) {
    background-color: #FFFFFF;
  }

  :deep(.v-field) {
    background-color: #FFFFFF;
    border: rgba(189, 224, 254, 0.5) 3px solid;
    border-radius: 2rem !important;

    height: $height_input;



    .v-field__outline {
      display: none;
    }

    .v-field__field{
      height: $height_input;
      border: none;

      .v-field__overlay{
        display: none;
      }

      .v-field-label{
        color: #2799FB;

        &--floating{
          top: 0;
          left: 0;
          font-size: .7rem;

          font-weight: 500;
        }
      }

      .v-field__input{
        height: inherit;
        padding-top: 0;
      }
    }
  }
}
</style>
