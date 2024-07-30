import {Transaction} from "@/types/Transaction";

export interface BaseStateInterface {
  data: Transaction[];
  isLoading: boolean;
  month: number;
  year: number;
}
