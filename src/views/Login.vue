<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row>
      <v-col>
        <Header />
        <FormLogin />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  //
import Header from "@/components/UnauthenticatedHeader.vue";
import FormLogin from "@/components/LoginForm.vue";
</script>
