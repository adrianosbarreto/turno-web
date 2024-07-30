import { Ref } from 'vue';

export interface CardResume {
  amount: number | Ref<number>;
  description: string;
}
