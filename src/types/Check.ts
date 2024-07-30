export default interface Check {
  id: number;
  transaction_id: number | null;
  picture: string;
  amount: string;
  account_id: number;
  status: 'pending' | 'accept' | 'reject';
  description: string;
  created_at: string;
  updated_at: string;
}
