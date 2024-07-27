<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="h-100">
        <form class="h-50 d-flex flex-column justify-center">
          <div class="pa-4">
            <CustomRoundedTextField
              v-model="state.name"
              label="username"
              required
              @blur="v$.name.$touch"
              @input="v$.name.$touch"
            ></CustomRoundedTextField>

            <CustomRoundedTextField
              v-model="state.email"
              label="email"
              required
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
            ></CustomRoundedTextField>

            <CustomRoundedTextField
              v-model="state.password"
              label="password"
              required
              @blur="v$.password.$touch"
              @input="v$.password.$touch"
            ></CustomRoundedTextField>
          </div>
          <div class="d-flex">
            <v-btn
              class="me-4 w-100"
              @click="v$.$validate"
            >
              sign up
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
  import CustomRoundedTextField from '@/components/custom/CustomRoundedTextField.vue';

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

</script>

<style scoped lang="scss">
  .divider{
    display: block;
    width: 20px;
    margin: 1rem 0;
    border-bottom: 3px solid #BDE0FE;
  }

  .login{
    color: #2799FB;
  }
</style>
