<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex flex-column justify-center">
        <form class="h-50 d-flex flex-column justify-center pa-4" @submit.prevent="registerUser">
          <div class="pa-4">
            <CustomRoundedTextField
              v-model="state.name"
              label="username"
              required
            ></CustomRoundedTextField>

            <CustomRoundedTextField
              v-model="state.email"
              label="email"
              required
            ></CustomRoundedTextField>

            <CustomRoundedTextField
              v-model="state.password"
              label="password"
              required
            ></CustomRoundedTextField>
          </div>
          <div class="d-flex">
            <v-btn
              type="submit"
              class="sign-up me-4 w-100"
            >
              sign up
            </v-btn>
          </div>

        </form>
        <div class="h-25 d-flex flex-column justify-center">
          <span class="divider mx-auto py-4"></span>

          <div>
            <v-btn
              class="me-4 w-100 text-none"
              variant="flat"
              color="white"
              @click="router.push('/login')"
            >
              <span class="login">
                Already have an account?
              </span>
            </v-btn>
          </div>
        </div>

      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, required } from '@vuelidate/validators';
  import CustomRoundedTextField from '@/components/CustomRoundedTextField.vue';
  import { useRouter } from 'vue-router';
  import {useNotificationStore} from "@/store/NotificationStore";
  import {registerAccount} from "@/services/AccountService";


  const notificationStore = useNotificationStore();

  const router = useRouter()

  const initialState = {
    name: '',
    email: '',
    password: '',
  }

  const state = reactive({
    ...initialState,
  })


  const rules = {
    name: { required },
    email: { required, email },
    password: {required},
  }

  const v$ = useVuelidate(rules, state)

  async function registerUser() {
    const validated = await v$.value.$validate();

    const user = {
      username: state.name,
      email: state.email,
      password: state.password,
    };

    if (validated) {
      const response = await registerAccount(user);

      if (response.status === 200) {
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );

        Object.assign(state, initialState);
      } else {
        notificationStore.showNotification(
          `${response.data.message}`,
          'error',
          2000
        );
      }
    }
  }


</script>

<style scoped lang="scss">
  .divider{
    display: block;
    width: 20px;
    margin: 1rem 0;
    border-bottom: 3px solid #BDE0FE;
  }

  .sign-up{
    background-color: #2799FB;
    color: white;
  }

  .login{
    color: #2799FB;
  }
</style>
