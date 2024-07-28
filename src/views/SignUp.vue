<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row>
      <v-col>
        <Header />
        <SignUpForm/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import Header from "@/components/UnauthenticatedHeader.vue";
  import SignUpForm from "@/components/SignUpForm.vue";
</script>
