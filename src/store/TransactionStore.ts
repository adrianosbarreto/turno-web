import {defineStore} from "pinia";
import {getTransactionByType} from "@/services/TransactionService";
import {Transaction} from "@/types/Transaction";
import {getChecks} from "@/services/CheckService";


const useTransactionStore = defineStore({
  id: "transaction",
  state: ()=> ({
    data: [] as Transaction[],
    expenses: [] as Transaction[],
    incomes: [] as Transaction[],
    checks: [] as Transaction[],
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    isLoading: false,
  }),
  actions: {
    async fetchTransactions(account_id: number) {
      this.isLoading = true;

      await getTransactionByType(account_id, null, this.month, this.year).then((response)=>{
          this.isLoading = false;
          this.data = response.data.data;
      });
    },
    async fetchIncomes(account_id: number, type: string) {
      this.isLoading = true;

      await getTransactionByType(account_id, type, this.month, this.year).then((response)=>{
        this.isLoading = false;
        this.incomes = response.data.data;
      });
    },
    async fetchExpenses(account_id: number, type: string) {
      this.isLoading = true;

      await getTransactionByType(account_id, type, this.month, this.year).then((response)=>{
        this.isLoading = false;
        this.expenses = response.data.data;
      });
    },
    async fetchChecks(account_id: number) {
      this.isLoading = true;

      await getChecks(account_id, this.month, this.year).then((response)=>{
        this.isLoading = false;
        this.checks = response.data.data;
      });
    },
  },
  getters: {
    totalIncome: (state) => {
      return state.data
        .filter(item => item.type === 'income')
        .reduce((acc, item) => acc + parseFloat(item.amount), 0);
    },
    totalExpense: (state) => {
      return state.data
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => acc + parseFloat(item.amount), 0);
    },
    totalBalance: (state) => {
      return state.data
        .reduce((acc, item) => {
          if (item.type === 'income') {
            return acc + parseFloat(item.amount);
          } else {
            return acc - parseFloat(item.amount);
          }
        }, 0);
    }
  }
});

export default useTransactionStore;
