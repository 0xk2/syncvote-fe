export interface ICheckPoint {
  id?: string | undefined,
  data?: any | undefined,
  children?: string[],
  title?: string | undefined,
  description?: string | undefined,
  position?: any,
  vote_machine_type?: string,
  isEnd?: boolean,
  duration?: number,
  enforcers?: IEnforcer[],
  locked?: any,
}

export interface IEnforcer {
  id: string,
  params: any,
}
