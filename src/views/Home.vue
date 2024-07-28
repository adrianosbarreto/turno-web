<script setup lang="ts">

import ListTransactable from "@/components/TransactableList.vue";
import {Transaction} from "@/types/Transaction";
import CardResumeTransaction from "@/components/TransactionResumeItem.vue";


const data: Transaction[] = [
  {
    "id": 1,
    "amount": 250.75,
    "description": "Purchase of office supplies",
    "date": "2024-07-25T10:20:30Z",
    "type": "expense",
    "createdAt": "2024-07-25T10:20:30Z",
    "updatedAt": "2024-07-25T10:20:30Z"
  },
  {
    "id": 2,
    "amount": 1000.00,
    "description": "Client payment for services",
    "date": "2024-07-26T12:45:00Z",
    "type": "income",
    "createdAt": "2024-07-26T12:45:00Z",
    "updatedAt": "2024-07-26T12:45:00Z"
  },
  {
    "id": 3,
    "amount": 150.00,
    "description": "Team lunch",
    "date": "2024-07-27T14:15:45Z",
    "type": "expense",
    "createdAt": "2024-07-27T14:15:45Z",
    "updatedAt": "2024-07-27T14:15:45Z"
  },
  {
    "id": 4,
    "amount": 750.50,
    "description": "Website development services",
    "date": "2024-07-28T09:30:00Z",
    "type": "income",
    "createdAt": "2024-07-28T09:30:00Z",
    "updatedAt": "2024-07-28T09:30:00Z"
  },
  {
    "id": 5,
    "amount": 300.00,
    "description": "Monthly subscription fee",
    "date": "2024-07-29T11:00:00Z",
    "type": "expense",
    "createdAt": "2024-07-29T11:00:00Z",
    "updatedAt": "2024-07-29T11:00:00Z"
  },
  {
    "id": 6,
    "amount": 1250.00,
    "description": "Invoice payment from client",
    "date": "2024-07-30T08:45:00Z",
    "type": "income",
    "createdAt": "2024-07-30T08:45:00Z",
    "updatedAt": "2024-07-30T08:45:00Z"
  },
  {
    "id": 7,
    "amount": 500.00,
    "description": "Office rent",
    "date": "2024-08-01T10:30:00Z",
    "type": "expense",
    "createdAt": "2024-08-01T10:30:00Z",
    "updatedAt": "2024-08-01T10:30:00Z"
  },
  {
    "id": 8,
    "amount": 200.00,
    "description": "Utility bills",
    "date": "2024-08-02T11:15:00Z",
    "type": "expense",
    "createdAt": "2024-08-02T11:15:00Z",
    "updatedAt": "2024-08-02T11:15:00Z"
  },
  {
    "id": 9,
    "amount": 3000.00,
    "description": "Project milestone payment",
    "date": "2024-08-03T14:00:00Z",
    "type": "income",
    "createdAt": "2024-08-03T14:00:00Z",
    "updatedAt": "2024-08-03T14:00:00Z"
  },
  {
    "id": 10,
    "amount": 50.00,
    "description": "Miscellaneous office expense",
    "date": "2024-08-04T09:45:00Z",
    "type": "expense",
    "createdAt": "2024-08-04T09:45:00Z",
    "updatedAt": "2024-08-04T09:45:00Z"
  },
  {
    "id": 15,
    "amount": 300.00,
    "description": "Monthly subscription fee",
    "date": "2024-07-29T11:00:00Z",
    "type": "expense",
    "createdAt": "2024-07-29T11:00:00Z",
    "updatedAt": "2024-07-29T11:00:00Z"
  },
  {
    "id": 16,
    "amount": 1250.00,
    "description": "Invoice payment from client",
    "date": "2024-07-30T08:45:00Z",
    "type": "income",
    "createdAt": "2024-07-30T08:45:00Z",
    "updatedAt": "2024-07-30T08:45:00Z"
  },
  {
    "id": 17,
    "amount": 500.00,
    "description": "Office rent",
    "date": "2024-08-01T10:30:00Z",
    "type": "expense",
    "createdAt": "2024-08-01T10:30:00Z",
    "updatedAt": "2024-08-01T10:30:00Z"
  },
  {
    "id": 18,
    "amount": 200.00,
    "description": "Utility bills",
    "date": "2024-08-02T11:15:00Z",
    "type": "expense",
    "createdAt": "2024-08-02T11:15:00Z",
    "updatedAt": "2024-08-02T11:15:00Z"
  },
  {
    "id": 19,
    "amount": 3000.00,
    "description": "Project milestone payment",
    "date": "2024-08-03T14:00:00Z",
    "type": "income",
    "createdAt": "2024-08-03T14:00:00Z",
    "updatedAt": "2024-08-03T14:00:00Z"
  },
  {
    "id": 20,
    "amount": 50.00,
    "description": "Miscellaneous office expense",
    "date": "2024-08-04T09:45:00Z",
    "type": "expense",
    "createdAt": "2024-08-04T09:45:00Z",
    "updatedAt": "2024-08-04T09:45:00Z"
  }
]

const incomes : Transaction = {
  "id": 1,
  "amount": 2350.75,
  "description": "Incomes",
  "date": "2024-07-25T10:20:30Z",
  "type": "expense",
  "createdAt": "2024-07-25T10:20:30Z",
  "updatedAt": "2024-07-25T10:20:30Z"
}

const expenses : Transaction = {
  "id": 1,
  "amount": 250.75,
  "description": "Expenses",
  "date": "2024-07-25T10:20:30Z",
  "type": "expense",
  "createdAt": "2024-07-25T10:20:30Z",
  "updatedAt": "2024-07-25T10:20:30Z"

}

console.log(data);
</script>

<template>
  <v-container class="pa-0 ma-0 h-100" >
    <v-row class="h-100">
      <v-col class="h-100">
        <CardResumeTransaction :transaction="incomes"/>
        <CardResumeTransaction :transaction="expenses"/>
        <ListTransactable :transactions="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

</style>
