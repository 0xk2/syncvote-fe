export interface ICheckPoint {
  id?: string | undefined,
  data?: any | undefined,
  children?: string[],
  title?: string | undefined,
  description?: string | undefined,
  position?: any,
  vote_machine_type?: string,
  isEnd?: boolean,
  duration?: number, // in seconds
  locked?: any,
  triggers?: any[],
  participation?: IParticipant,
}

export interface IParticipant {
  type?: 'token' | 'identity',
  data?: IToken | string[],
}

export interface IToken {
  network?: string,
  address?: string,
  min?: number,
}
