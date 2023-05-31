import { ICheckPoint as icp } from '../../types';
import dg from './DirectedGraph';
import rvmcp from './renderVoteMachineConfigPanel';
import esg from './emptyStage';
import {
  registerVoteMachine as reg,
  getVoteMachine as gvm,
} from './voteMachine';

export const DirectedGraph = dg;
export const renderVoteMachineConfigPanel = rvmcp;
export const emptyStage = esg;
export const registerVoteMachine = reg;
export const getVoteMachine = gvm;
export type { icp as ICheckPoint };
