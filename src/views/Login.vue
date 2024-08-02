<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row>
      <v-col class="pa-4 ma-4">
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
import {isAuthenticated} from "@/services/AuthService";
import {useRouter} from "vue-router";
import {onMounted} from "vue";


const router = useRouter();

onMounted(() => {
  if (isAuthenticated()) {
    router.push({ name: 'Home' });
  }

});

</script>
