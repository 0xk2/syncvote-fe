export interface IMember {
  id: number;
  nameTag: string;
  roleId: string;
  walletAddress: string;
}

export interface IRole {
  id: string | number;
  label: string;
  value?: string;
}
