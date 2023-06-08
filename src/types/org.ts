export interface IOrg {
  id: number;
  title: string;
  desc: string;
  icon_url: string;
  banner_url: string;
  preset_icon_url?: string;
  preset_banner_url?: string;
  org_type: string;
  org_size: string;
  role: string;
}
