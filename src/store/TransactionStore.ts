import {defineStore} from "pinia";
import {Transaction} from "@/types/Transaction";
import {getAllTransaction} from "@/services/TransactionService";


const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    transactions: [] as Transaction[],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    isLoading: false,
  }),
  actions: {
    async fetchTransactions(account_id: number) {
      this.isLoading = true;

      await getAllTransaction(account_id, this.month, this.year).then((response)=>{
          this.isLoading = false;
          this.transactions = response.data.data;
      });

    }
  },
  getters: {
    totalIncome: (state) => {
      return state.transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    },
    totalExpense: (state) => {
      return state.transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    },
    totalBalance: (state) => {
      return state.transactions
        .reduce((acc, transaction) => {
          if (transaction.type === 'income') {
            return acc + parseFloat(transaction.amount);
          } else {
            return acc - parseFloat(transaction.amount);
          }
        }, 0);
    }
  }
});

export default useTransactionStore;
