export interface Checkpoint {
  method: string;
}

export interface BlueprintDataType {
  name: string;
  totalCheckpoints: number;
  Node: any;
  listCheckpoint: any[];
}
