<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex flex-column justify-center">
        <form @submit.prevent="loginUser" class="h-100 pa-4 d-flex flex-column justify-center">
          <div class="pa-4">
            <CustomRoundedTextField
              v-model="state.email"
              label="email"
              required
              :message="v$.email.$errors?.map((e) => e.$message)"
            ></CustomRoundedTextField>

            <CustomRoundedTextField
              v-model="state.password"
              label="password"
              required
              :message="v$.password.$errors?.map((e) => e.$message)"
            ></CustomRoundedTextField>
          </div>
          <div class="d-flex">
            <v-btn
              class="sign me-4 w-100"
              type="submit"
            >
              sign in
            </v-btn>
          </div>

        </form>
        <div class="h-25 d-flex flex-column justify-center">
          <span class="divider mx-auto"></span>

          <div>
            <v-btn
              class="me-4 w-100 text-none"
              variant="flat"
              color="white"
              @click="router.push('/signup')"
            >
              <span class="login">
                Create an account
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
  import {useNotificationStore} from "@/store/NotificationStore";
  import {login} from "@/services/AccountService";
  import { useRouter } from 'vue-router';
  import axios from "@/plugins/axios";
  import axiosCommon from "@/plugins/axios";
  import {useAccountStore} from "@/store/AccountStore";

  const router = useRouter();

  const notificationStore = useNotificationStore();

  const initialState = {
    email: '',
    password: '',
  }

  const state = reactive({
    ...initialState,
  })


  const rules = {
    email: { required, email },
    password: {required},
  }

  const v$ = useVuelidate(rules, state)

  async function loginUser() {
    const validated = await v$.value.$validate();

    console.log(state.email, validated, "passou");

    const user = {
      email: state.email,
      password: state.password,
    };

    if (validated) {
      const response = await login(user);

      if (response.status === 200) {
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );


        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('user_type', response.data.data.user_type);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;

        console.log('Token configurado no Axios:', axiosCommon.defaults.headers.common['Authorization']);
        useAccountStore().setAccountId(response.data.data.account_id);

        await router.push('/home');

        // Object.assign(state, initialState);
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

  .sign{
    background-color: #2799FB;
    color: white;
  }

  .login{
    color: #2799FB;
  }
</style>
