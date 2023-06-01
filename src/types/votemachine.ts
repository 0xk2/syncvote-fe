export interface IVoteMachineConfigProps {
  editable: boolean,
  currentNodeId?: string,
  allNodes: any[],
  children: string[],
  data: any,
  onChange: (data:any) => void,
  /**
   * Solana Address
   * - If Provider is an excutable program then CPI to get the data
   * - If Provider is a Solana Address then it will be a signer of the txn
   * - If null voting power is always 1
   */
  votingPowerProvider?: string,
  /**
  * List of Solana Addresses
  * - If whitelist is empty then anyone can vote and votingPowerProvider decide the voting power
  * - If whitelist is not empty then only whitelisted addresses can vote
  *   and votingPowerProvider decide the voting power
  */
  whitelist?: string[],
}

export interface IVoteMachineGetLabelProps {
  source: any,
  target: any,
}

export interface IVoteMachine {
  ConfigPanel: (props:IVoteMachineConfigProps) => JSX.Element,
  getName: () => string,
  getProgramAddress: () => string,
  getType: () => string,
  deleteChildNode: (data: any, children:string[], childId:string) => void,
  getLabel: (props: IVoteMachineGetLabelProps) => JSX.Element,
  getIcon: () => JSX.Element,
}
