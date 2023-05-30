import * as XLSX from 'xlsx';
import { AlertMessage, SelectBoxOption } from 'types/common';

export type IOptionDataSource = {
  id?: string;
  fileName: string;
  activeSheet: { value: string; label: string };
  sheetNames: { value: string; label: string }[];
  optionColumn: string;
  isIgnoreHeader: boolean;
  workbook: XLSX.WorkBook;
  optionsData: string[][];
};

export type ProposalStepType = {
  id: number;
  label: string;
  isPassed: boolean;
  param: string;
};

export interface IVotingDetail {
  allowedBy: SelectBoxOption;
  allowedRoles: Array<SelectBoxOption>;
  tokenAddress: string;
  minimumHoldingPeriod: {
    value: string | number;
    type: SelectBoxOption | null;
  };
  minimumHoldingQuantity: string | number;
  rolesOptions?: Array<SelectBoxOption>;
}

export interface RoleOptionsInterface {
  id: string;
  label: string;
}

export interface VotingValidateInterface {
  allowedBy: AlertMessage | null;
  allowedRoles: AlertMessage | null;
  tokenAddress: AlertMessage | null;
  recipientAddress: AlertMessage | null;
  minimumHoldingPeriod: AlertMessage | null;
  minimumHoldingQuantity: AlertMessage | null;
  executionTimeValidate: AlertMessage | null;
  endTimeValidate: AlertMessage | null;
  startTimeValidate: AlertMessage | null;
  startTimeMoreEndTime?: AlertMessage | null;
}

export interface OptionType {
  id: number | string;
  value: string;
  status?: null | AlertMessage;
}

export interface OptionBlueprintType {
  id: number | string;
  value: string;
  isLoop?: boolean;
  status?: null | AlertMessage;
}

export interface MethodVoteOptionType {
  id: number | string;
  value: string;
  status?: null | AlertMessage;
  isLoop?: boolean;
}

export interface VotingMethodDataType {
  method: string;
  option: [
    {
      id: number;
      value: string;
      status?: null | AlertMessage;
    },
  ];
  inputNumberOfResults: number;
  isVotingCondition: boolean;
  numberOfOptions: number;
  thresholdValueResult: number;
  datasource: string[];
}

export interface MethodVoteOptionChoiceType {
  id: number;
  value: string;
  isLoop: boolean;
  status?: null | AlertMessage;
  isChoice?: boolean;
}

export interface GmailEnforcerDetail {
  isConnect: boolean;
  action: string;
  connectionOptions: any[];
  selectedConnection: string;
  details: GmailDetail[];
}

export interface GmailDetail {
  sendTo: string;
  recipientAddress: string;
  csvFile: any[];
  title: string;
  emailContent: string;
}

export interface TwitterDetail {
  isConnect: boolean;
  action: string;
  connectionOptions: any[];
  selectedConnection: string | SelectBoxOption;
  postContent: string;
}
