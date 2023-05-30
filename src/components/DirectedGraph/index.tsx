import scm from './VotingMachine/SingleChoiceRaceToMax';
import mcm from './VotingMachine/MultipleChoiceRaceToMax';
import dg from './DirectedGraph';
import gvm from './getVoteMachine';
import { ICheckPoint as icp } from './interfaces';
import esg from './emptyStage';

export const SingleChoiceRaceToMax = scm;
export const MultipleChoiceRaceToMax = mcm;
export const DirectedGraph = dg;
export const getVoteMachine = gvm;
export const emptyStage = esg;
export type { icp as ICheckPoint };
