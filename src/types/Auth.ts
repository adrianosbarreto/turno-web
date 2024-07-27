interface Auth {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}
