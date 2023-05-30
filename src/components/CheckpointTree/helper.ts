import { ICheckpointNode } from 'types/checkpoint';
import { L } from '@utils/locales/L';
import { ALLOW_OPTION } from './constants';

export function validateThresholdValue(threshold: number) {
  if (threshold < 0.01 || threshold >= 100) {
    return {
      error: true,
      message: L('valueMustBeGreater'),
    };
  }

  return {
    error: false,
    message: '',
  };
}

export const handleThresholdValue = ({
  nextValue,
  thresholdValue,
  votingDetail,
  setThresholdValue,
  setVotingDetail,
}: {
  nextValue: string;
  thresholdValue: any;
  votingDetail: any;
  setThresholdValue: (value: any) => void;
  setVotingDetail: (value: any) => void;
}) => {
  const thresholdRegex = /^\d+(\.\d{0,3})?$/;
  if (nextValue !== '' && !thresholdRegex.test(nextValue)) return;

  const { error, message } = validateThresholdValue(+nextValue);

  let status = null;
  if (error) {
    status = {
      type: 'WARN',
      message,
    };
  }

  setThresholdValue({
    ...thresholdValue,
    value: nextValue,
    status,
  });

  setVotingDetail({
    ...votingDetail,
    thresholdValue: {
      ...thresholdValue,
      value: nextValue,
      status,
    },
  });
};

export const handleValidateVotingDetail = (votingContent: {
  isVotingCondition: boolean;
  thresholdValue: any;
  detail: any;
}): { isCompleted: boolean } => {
  const { isVotingCondition, thresholdValue, detail } = votingContent;
  if (isVotingCondition && (!thresholdValue.value || thresholdValue.status?.type)) {
    return { isCompleted: false };
  }

  if (detail.allowedBy.id === ALLOW_OPTION.ROLE) {
    if (!detail.allowedBy || detail.allowedRoles.length === 0) {
      return { isCompleted: false };
    }
  } else if (
    detail.tokenAddress.trim() === '' ||
    // detail.minimumHoldingPeriod.value === '' ||
    // detail.minimumHoldingQuantity.value === '' ||
    !Number.isInteger(Number(detail.minimumHoldingQuantity.value)) ||
    Number(detail.minimumHoldingQuantity.value) < 0
  ) {
    return { isCompleted: false };
  }

  return { isCompleted: true };
};

export const handleClickSave = (configValidate: {
  isVotingCondition: boolean;
  thresholdValue: any;
  votingDetail: any;
  listCheckPoints: ICheckpointNode[];
  node: ICheckpointNode | null;
  setListCheckPoints: (cps: any) => void;
  onCloseCheckpoint: () => void;
}) => {
  const {
    isVotingCondition,
    thresholdValue,
    votingDetail,
    listCheckPoints,
    node,
    setListCheckPoints,
    onCloseCheckpoint,
  } = configValidate;

  const { isCompleted } = handleValidateVotingDetail({
    isVotingCondition,
    thresholdValue,
    detail: votingDetail,
  });

  if (!isCompleted) {
    return;
  }

  const indexCurrentCp = listCheckPoints.findIndex((cp) => cp.id === node?.id);
  if (indexCurrentCp === -1) {
    return;
  }

  const nextListCheckpoint = [...listCheckPoints];
  nextListCheckpoint[indexCurrentCp] = {
    ...nextListCheckpoint[indexCurrentCp],
    config: { ...votingDetail, isComplete: isCompleted },
  };

  setListCheckPoints(nextListCheckpoint);
  onCloseCheckpoint();
};
