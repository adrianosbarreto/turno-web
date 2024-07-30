import {Transaction} from "@/types/Transaction";
import {BaseStateInterface} from "@/types/BaseStateInterface";

export interface BaseStoreInterface<T extends BaseStateInterface>{
  state: T;
  fetchData(id: number): Promise<void>;
  getData(): Transaction[];
  $patch: (state: Partial<T>) => void;
  $reset: () => void;
  $subscribe: (callback: (mutation: any) => void) => () => void;
}
