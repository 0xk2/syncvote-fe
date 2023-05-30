export interface IMemberType {
  id: string | number;
  name: string;
  walletAddress: string;
}

export interface IMemberRoles {
  id: string | number;
  member: IMemberType[];
}
