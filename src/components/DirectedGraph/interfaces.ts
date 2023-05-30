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
  locked?: any,
  triggers?: any[],
}

export interface IEnforcer {
  id: string,
  params: any,
}
