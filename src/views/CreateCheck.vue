//ts-nocheck
<template>
  <v-container>
    <CardResumeTransaction :card-resume="balanceCard" color="#F1F9FE" color-title="#BDE0FE"/>
  </v-container>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="0" class="d-flex flex-column justify-lg-space-between">
          <v-form @submit.prevent="insertCheck" class="ma-4">
            <v-row>
              <v-col cols="9">
                <v-label class="text-field text-uppercase font-weight-bold">
                  <v-icon size="30" :icon="mdiCash100"> </v-icon>
                  <p class="pl-3">Amount</p>
                </v-label>
                <v-text-field
                  v-model="state.amount"
                  required
                  variant="underlined"
                  class="text-primary"
                  @input="onValueChange"
                  :error-messages="vuelidate.amount.$errors?.map((e) => e.$message)"
                >
                  <template v-slot:prepend-inner>
                    <span>$</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="3" align-self="center">
                <p class="text-uppercase text-large align-self-center">USD</p>
              </v-col>
            </v-row>
            <v-label class="text-field text-wrap pb-4">
              <p class="">
                *The money will be deposited in your account once is the check is accepted.
              </p>
            </v-label>

            <v-row>
              <v-col cols="9">
                <v-label class="text-field text-uppercase font-weight-bold">
                  <v-icon size="20" :icon="mdiCalendarRange"></v-icon>
                  <p class="pl-3">Date</p>
                </v-label>
                <v-text-field variant="underlined" readonly class="text-primary text-xl" width="75%">
                  {{ formattedDate }}
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-label class="text-field text-uppercase font-weight-bold">
                  <v-icon size="20" :icon="mdiStar"></v-icon>
                  <span class="pl-3">Description</span>
                </v-label>
                <v-text-field
                  required
                  v-model="state.description"
                  variant="underlined"
                  class="text-primary"
                  :error-messages="vuelidate.description.$errors?.map((e) => e.$message)"
                ></v-text-field>
              </v-col>

            </v-row>
            <div class="upload-area pb-4">

              <v-file-input
                variant="solo"
                width="30"
                v-model="state.file"
                :error-messages="vuelidate.file.$errors.map((e) => e.$message) || ''"
                :class="`check w-100 ${!state.file?'py-12': ''}`"
                @change="onFileChange"
              >
                <template v-slot:label v-if="!state.file">
                  <div class="d-flex flex-column justify-center align-center">
                    <v-icon
                      color="primary"
                      :icon="mdiCloudUploadOutline"
                      size="50"
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
                @click="vuelidate.$validate"
                :loading="isLoading"
              >
                Deposit Check
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
  import {computed, reactive, ref} from "vue";
  import {getMonthDayYear} from "@/util/DateFormat";
  import CardResumeTransaction from "@/components/TransactionResumeItem.vue";
  import {storeToRefs} from "pinia";
  import {useAccountStore} from "@/store/AccountStore";
  import {CardResume} from "@/types/CardResume";
  import {useNotificationStore} from "@/store/NotificationStore";
  import {addCheck} from "@/services/CheckService";
  import {mdiCalendarRange, mdiCash100, mdiCloudUploadOutline, mdiStar} from "@mdi/js";
  import {useRouter} from "vue-router";

  const useRoute = useRouter();

  const notificationStore = useNotificationStore();

  const {balance} = storeToRefs(useAccountStore());

  const isLoading = ref(false);

  const balanceCard : CardResume = {
    "amount": balance,
    "description": "Current balance",
  }

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


  const rules = {
    amount: { required },
    description: { required},
    file: {required},
  }

  const vuelidate = useVuelidate(rules, state);

  const imageSrc = ref('');


  const formattedDate = computed(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return getMonthDayYear(day, month, year);
  });

  const onValueChange = (event: any) => {
    let value = event.target.value;
    value = value.replace(/[^\d,]/g, '');
    value = (value / 100).toFixed(2);
    state.amount = value;
  }

  async function insertCheck(){
    const validated = await vuelidate.value.$validate();

    if(validated){

      isLoading.value = true;

      const transaction = {
        amount: state.amount,
        description: state.description,
        picture: imageSrc.value,
        status: 'pending'
      }

      const response = await addCheck(useAccountStore().account_id, transaction);

      if(response.status === 200){
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );

        isLoading.value = false

        useRoute.back();

      }
      else{
        notificationStore.showNotification(
          `${response.message}`,
          'error',
          2000
        );

        isLoading.value = false
      }
    }
  }


  // Função para converter o arquivo para base64
  async function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      imageSrc.value = typeof reader.result == "string" ? reader.result : '';
    };

    reader.readAsDataURL(file);
  }

</script>


<style scoped lang="scss">
.purchase{
  background-color: #2799FB;
  color: white;
}

.text-field{
  color: #2799FB;
  font-size: 0.7rem;
}

.text-large{
  font-size: 1.5rem;
  color: #2799FB;
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
      padding-left: 2rem;

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
