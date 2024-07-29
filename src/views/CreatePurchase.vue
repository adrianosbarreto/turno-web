<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="d-flex flex-column justify-lg-space-between">
          <v-form @submit.prevent="addCheck">

                <div class="upload-area pa-4">

                  <v-file-input
                    variant="solo"
                    width="30"
                    v-model="state.file"
                    :error-messages="v$.file.$errors.map((e) => e.$message)"
                    :class="`check w-100 ${!state.file?'py-12': ''}`"
                  >
                    <template v-slot:label v-if="!state.file">
                      <div class="d-flex flex-column justify-center align-center">
                        <v-icon
                          color="primary"
                          icon="mdi-home"
                        >
                        </v-icon>
                        <p class="text-uppercase">Upload check picture</p>
                      </div>
                    </template>
                    <template v-slot:selection="{ fileNames }">
                      <template v-for="fileName in fileNames" :key="fileName">
                        <v-img
                          :width="200"
                          :height="200"
                          cover
                          :src="getImage()"
                        >
                        </v-img>
                      </template>
                    </template>
                  </v-file-input>
                </div>
            <div class="d-flex">
              <v-btn
                type="submit"
                class="purchase me-4 w-100"
                @click="v$.$validate"
              >
                Add Purchase
              </v-btn>
            </div>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup lang="ts">
  import {required} from "@vuelidate/validators";
  import {useVuelidate} from "@vuelidate/core";
  import {reactive} from "vue";

  const initialState = {
    amount: '',
    description: '',
    file: null,
  }

  const state = reactive({
    ...initialState,
  })

  function getImage (){
    if (state && state.file && state.file) {
      return URL.createObjectURL(state.file);
    } else {
      return '';
    }
  }

  function addCheck(){
    console.log('addCheck');
  }

  const rules = {
    amount: { required },
    description: { required},
    file: {required},
  }

  const v$ = useVuelidate(rules, state);
</script>


<style scoped lang="scss">
  .purchase{
    background-color: #2799FB;
    color: white;
  }

  .check {
    border: 2px dashed #2799FB !important;
  }

  :deep(.v-field){
    box-shadow: none;
    height: 100%;

    .v-field__field{
      display: flex;
      justify-content: center;
      align-items: center;

      .v-field__input{

        .v_img{
          width: 100%;

          object-fit: cover;

          .v-img__img {
            height: 100px !important;
          }
        }

      }

      :deep(label .v-field-label){
        display: flex;
        opacity: 1;
      }

    }

    .v-field__clearable{
      position: absolute;
      right: 0;
    }
  }


  ///remove o icone default
  :deep(.v-input__prepend){
    display: none;
  }


</style>
