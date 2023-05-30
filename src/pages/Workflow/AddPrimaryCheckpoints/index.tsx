import React, { useState } from 'react';
import ArrowIcon from '@assets/icons/svg-icons/ArrowIcon';
import CheckpointNode from '@components/CheckpointNode/CheckpointNode';
import CounterInput from '@components/CounterInput/CounterInput';
import PageWrapper from '@components/PageWrapper';
import Tag from '@components/Tag/Tag';
import { ECheckpointsType } from 'types/enums/checkpoints';
import { L } from '@utils/locales/L';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import ErrorIcon from '@assets/icons/svg-icons/ErrorIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import {
  resetBlueprint,
  setName,
  setTotalPrimaryCp as setNumPrimaryCp,
} from '@redux/reducers/blueprint.reducer';
import EditTextName from '@components/EditTextName/EditTextName';
import { CP_NAME } from '@constants/checkpoint';

const AddPrimaryCheckpoints: React.FC = () => {
  const {
    name,
    totalPrimaryCp: numOfPrimaryCp,
    listCheckpoint,
  } = useSelector((state: RootState) => state.blueprint);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [totalPrimaryCp, setTotalPrimaryCp] = useState<number | string>(numOfPrimaryCp || 2);

  const isValidInput = +totalPrimaryCp >= 2 && +totalPrimaryCp <= 20;
  const onChangeInput = (n: number | string) => {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(+n)) {
      setTotalPrimaryCp(+n || '');
    }
  };
  const onIncreasing = () => {
    if (+totalPrimaryCp < 20) {
      setTotalPrimaryCp(+totalPrimaryCp + 1);
    }
  };

  const onDecreasing = () => {
    if (+totalPrimaryCp > 2) {
      setTotalPrimaryCp(+totalPrimaryCp - 1);
    }
  };

  const handleSaveBlueprintName = (blueprintName: string) => {
    dispatch(setName(blueprintName));
  };

  const handleNextStep = () => {
    if (!isValidInput) return;

    // reset checkpoint tree when user change number of primary checkpoint
    if (listCheckpoint.length > 0 && totalPrimaryCp !== numOfPrimaryCp) {
      dispatch(resetBlueprint({ keepName: true }));
    }
    dispatch(setNumPrimaryCp(+totalPrimaryCp));
    navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT]));
  };

  return (
    <PageWrapper classes="container flex flex-col h-content-full">
      <div className="max-w-[100%]">
        <EditTextName classes="pt-[32px]" title={name} handleSaveValue={handleSaveBlueprintName} />
      </div>
      <div className="flex flex-col h-full items-center justify-center ">
        <div className="">
          <div className="text-md text-grey-version-6 font-medium mb-4">
            {L('inputPrimaryCheckpointLabel')}
          </div>
          <CounterInput
            value={totalPrimaryCp}
            onChangeInput={(n: number | string) => onChangeInput(n)}
            onIncreasing={onIncreasing}
            onDecreasing={onDecreasing}
            isValidInput={isValidInput}
          />
          {!isValidInput && (
            <div className="flex items-center gap-8px">
              <ErrorIcon />
              <span className="text-emph-caption-1 text-grey-version-5">
                Please input from 2 - 20
              </span>
            </div>
          )}
          <div className="mt-4">
            <Tag classes="cursor-pointer p-1" onClick={() => setTotalPrimaryCp(2)}>
              {`2 ${L('checkpoints').toLowerCase()}`}
            </Tag>
            <Tag classes="cursor-pointer p-1" onClick={() => setTotalPrimaryCp(3)}>
              {`3 ${L('checkpoints').toLowerCase()}`}
            </Tag>
            <Tag classes="cursor-pointer p-1" onClick={() => setTotalPrimaryCp(6)}>
              {`6 ${L('checkpoints').toLowerCase()}`}
            </Tag>
          </div>
          <div className={`flex justify-end mt-9  ${isValidInput}`}>
            <div className="cursor-pointer flex" onClick={() => handleNextStep()}>
              <span
                className={`text-md select-none ${
                  isValidInput ? ' text-violet-primary' : 'text-grey-version-5'
                }`}
              >
                {L('continue')}
              </span>
              <ArrowIcon color={isValidInput ? '#5D23BB' : '#898988'} />
            </div>
          </div>
        </div>
        <div className="flex container justify-center max-w-[90%] overflow-x-auto custom-scroll-bar">
          {Array(+totalPrimaryCp + 1)
            .fill('')
            .map((_, index) => (
              <CheckpointNode
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                id={index}
                isFirstOfLeaf={index === 0}
                isLastOfLeaf={index === +totalPrimaryCp}
                type={index !== +totalPrimaryCp ? ECheckpointsType.unknown : ECheckpointsType.end}
                name={index !== +totalPrimaryCp ? `${CP_NAME.cp}${index + 1}` : CP_NAME.end}
                isSelected={false}
                isPreview
                parentId={index === 0 ? null : 1}
                isAddPrimarySection
              />
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddPrimaryCheckpoints;
