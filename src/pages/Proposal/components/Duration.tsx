import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import {
  setProposalEndTime,
  setProposalStartTime,
  updateCompletedSteps,
  updateHighestStep,
} from '@redux/reducers/proposal.reducer';
import NavigateButtons from '@pages/Proposal/components/NavigateButtons';
import { AlertMessage } from 'types/common';
import SectionWrapper from './commons/SectionWrapper';
import CustomInput from './commons/CustomInput';

const Duration = () => {
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const durationData = useSelector((state: RootState) => state.proposal.duration);
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const votingMethodData = useSelector((state: RootState) => state.proposal.votingMethod);
  const [startTime, setStartTime] = useState<Dayjs | null>(durationData.startTime);
  const [endTime, setEndTime] = useState<Dayjs | null>(durationData.endTime);
  const [error, setError] = useState<{ [key: string]: AlertMessage | null }>({});

  useEffect(() => {
    if (!isProgress) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    } else {
      setCurrentStep(4);
      dispatch(updateHighestStep(4));
    }
  }, []);

  useEffect(() => {
    const nextError = { ...error };
    if (endTime && startTime && endTime < startTime) {
      nextError.endTimeValidate = {
        type: 'WARN',
        message: L('endTimeGreaterThanStartTime'),
      };
    } else {
      nextError.startTimeValidate = null;
      nextError.endTimeValidate = null;
    }
    setError(nextError);
  }, [endTime]);

  useEffect(() => {
    const nextError = { ...error };
    if (endTime && startTime && endTime < startTime) {
      nextError.startTimeValidate = {
        type: 'WARN',
        message: L('endTimeGreaterThanStartTime'),
      };
    } else {
      nextError.startTimeValidate = null;
      nextError.endTimeValidate = null;
    }
    setError(nextError);
  }, [startTime]);

  const handleContinue = () => {
    let check = true;
    if (!startTime) {
      check = false;
      error.allowedBy = {
        type: 'WARN',
        message: L('pleaseSelectTheTime'),
      };
    } else {
      error.allowedBy = null;
    }
    if (!endTime) {
      check = false;
      error.allowedRoles = {
        type: 'WARN',
        message: L('pleaseSelectTheTime'),
      };
    } else {
      error.allowedRoles = null;
    }
    if (endTime && startTime && endTime < startTime) {
      check = false;
      error.endTimeValidate = {
        type: 'WARN',
        message: L('endTimeGreaterThanStartTime'),
      };
    } else {
      error.endTimeValidate = null;
    }

    setError(error);
    if (check) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ENFORCE}`);
      setCurrentStep((prev: number) => prev + 1);
      dispatch(setProposalStartTime(startTime));
      dispatch(setProposalEndTime(endTime));
      dispatch(updateCompletedSteps(currentStep));
    }
  };
  const handleBack = () => {
    navigate(
      `/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.VOTING_METHOD}?type=${votingMethodData.method}`,
    );
    setCurrentStep((prev: number) => prev - 1);
    dispatch(setProposalStartTime(startTime || null));
    dispatch(setProposalEndTime(endTime || null));
  };

  return (
    <SectionWrapper>
      <div className="pt-[56px] w-full">
        <div className="w-full text-grey-version-6">
          <div className="font-semibold text-base-3xl leading-10 pb-4">
            <span>{L('setupVotingDuration')}</span>
          </div>
          <div className="font-medium text-[16px]leading-line-semi-lower tracking-0.5px">
            <p>{L('pleaseKeepInMind')}</p>
          </div>
        </div>

        <div className="pt-8 flex">
          <div className="w-[50%] pr-[6px]">
            <div className=" pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
              <p>{L('startTime')}</p>
            </div>
            <div className="flex justify-between" />
            <div className="h-[60px]">
              <CustomInput
                className="relative"
                childrenClassName="border-none"
                validate={error.allowedBy || error.startTimeValidate}
              >
                <CommonDateTimePicker
                  className={`flex justify-center items-center border-1.5 ${
                    !error.allowedBy && !error.startTimeValidate
                      ? 'border-grey-version-3'
                      : 'border-yellow-version-5'
                  } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                  onChange={(date: Dayjs | null) => {
                    if (!date) {
                      setStartTime(null);
                    } else {
                      setStartTime(date);
                      error.startTimeValidate = null;
                      error.allowedBy = null;
                    }
                  }}
                  suffixIcon={<TimeIcon />}
                  defaultDate={startTime}
                  id="startTime"
                />
              </CustomInput>
            </div>
          </div>

          <div className="w-[50%] pl-[6px]">
            <div className="pb-2 font-medium text-text_6 leading-5 text-grey-version-6">
              <p>{L('endTime')}</p>
            </div>
            <div className="flex justify-between" />
            <div className="h-[60px]">
              <CustomInput
                className="relative"
                childrenClassName="border-none"
                validate={error.allowedRoles || error.endTimeValidate}
              >
                <CommonDateTimePicker
                  className={`flex justify-center items-center border-1.5 ${
                    !error.allowedRoles && !error.endTimeValidate
                      ? 'border-grey-version-3'
                      : 'border-yellow-version-5'
                  } rounded-8 h-[57px] p-[16px] w-full mt-2`}
                  onChange={(date: Dayjs | null) => {
                    if (!date) {
                      setEndTime(null);
                    } else {
                      setEndTime(date);
                      error.endTimeValidate = null;
                      error.allowedRoles = null;
                    }
                  }}
                  suffixIcon={<TimeIcon />}
                  defaultDate={endTime}
                  id="endTime"
                />
              </CustomInput>
            </div>
          </div>
        </div>

        <NavigateButtons
          isDisable={false}
          handleContinue={handleContinue}
          handleBack={handleBack}
        />
      </div>
    </SectionWrapper>
  );
};

export default Duration;
