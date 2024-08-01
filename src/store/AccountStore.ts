import {getBalance} from "@/services/AccountService";
import {defineStore} from "pinia";

export const useAccountStore = defineStore({
    id: "account",
    state: () => ({
        balance: 0,
        isLoading: false,
        account_id: null as number | null,
    }),
    actions: {
        async fetchBalance(account_id : number) {
            this.isLoading = true;
            await getBalance(account_id).then((response)=> {
                this.balance = response.data.data?.balance || 0;
                this.isLoading = false;
            });
        },
        setAccountId(account_id: number) {
          this.account_id = account_id;
        }
    },


});
