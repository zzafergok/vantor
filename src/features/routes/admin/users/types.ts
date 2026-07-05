export type AdminUserRow = {
  name: string;
  role: string;
  status: string;
};

export type AdminUsersCopy = {
  title: string;
  description: string;
  cardTitle: string;
  users: AdminUserRow[];
};
