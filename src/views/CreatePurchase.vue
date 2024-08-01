<template>
  <v-container  fluid >
    <CardResumeTransaction :card-resume="balanceCard" color="#F1F9FE" color-title="#BDE0FE"
    />

  </v-container>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="h-100">
        <v-card elevation="0" class="h-100">
          <v-form @submit.prevent="insertPurchase" class="h-100 pa-4 d-flex flex-column justify-space-evenly">
            <div>
              <v-row>
                <v-col cols="9">
                  <v-label class="text-field text-uppercase font-weight-bold">
                    <v-icon size="20" icon="mdi-home"> </v-icon>
                    <p class="pl-3">Amount</p>
                  </v-label>
                  <v-text-field
                    v-model="stateForm.amount"
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

              <v-row>
                <v-col cols="9">
                  <v-label class="text-field text-uppercase font-weight-bold">
                    <v-icon size="20" icon="mdi-home"></v-icon>
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
                    <v-icon size="20" icon="mdi-home"></v-icon>
                    <span class="pl-3">Description</span>
                  </v-label>
                  <v-text-field
                    required
                    v-model="stateForm.description"
                    variant="underlined"
                    class="text-primary"
                    :error-messages="vuelidate.description.$errors?.map((e) => e.$message)"
                  ></v-text-field>
                </v-col>

              </v-row>
            </div>

            <div class="d-flex">
              <v-btn
                type="submit"
                class="purchase me-4 w-100"
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
  import {computed, reactive} from "vue";
  import {getMonthDayYear} from "@/util/DateFormat";
  import {useNotificationStore} from "@/store/NotificationStore";
  import {createPurchase} from "@/services/TransactionService";
  import CardResumeTransaction from "@/components/TransactionResumeItem.vue";
  import {CardResume} from "@/types/CardResume";
  import {storeToRefs} from "pinia";
  import {useAccountStore} from "@/store/AccountStore";

  const {balance} = storeToRefs(useAccountStore());

  const balanceCard : CardResume = {
    "amount": balance,
    "description": "Current balance",
  }

  const notificationStore = useNotificationStore();

  const initialState = {
    amount: '',
    description: '',
  }

  const stateForm = reactive({
    ...initialState,
  })

  const  rules = computed(() => {
    return {
      amount: {required},
      description: {required},
    }
  });

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
    stateForm.amount = value;
  }

  const vuelidate = useVuelidate(rules, stateForm);

  async function insertPurchase(){
    const validated = await vuelidate.value.$validate();

    const transaction = {
      amount: stateForm.amount,
      description: stateForm.description,
      type: 'expense',
      account_id: 4
    }

    if(validated){
      const response = await createPurchase(transaction);

      if(response.status === 200){
        notificationStore.showNotification(
          `${response.data.message}`,
          'success',
          2000
        );

        // stateForm.value = initialState;
      }
      else{
        console.log(response.message)
        notificationStore.showNotification(
          `${response.message}`,
          'error',
          2000
        );
      }
    }
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