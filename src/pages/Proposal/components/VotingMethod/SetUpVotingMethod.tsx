import React, { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import CheckCircleIcon from '@assets/icons/svg-icons/CheckCircleIcon';
import SignalIcon from '@assets/icons/svg-icons/SignalIcon';
import ThumbLikeIcon from '@assets/icons/svg-icons/ThumbLikeIcon';
import { L } from '@utils/locales/L';
import NoFlashIcon from '@assets/icons/svg-icons/NoFlashIcon';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setMethod, setTypeOfMethod, updateHighestStep } from '@redux/reducers/proposal.reducer';

interface Props {
  setSearchParams?: any;
}

const SetUpVotingMethod: React.FC<Props> = ({ setSearchParams }) => {
  const navigate = useNavigate();
  const { setCurrentStep } = useOutletContext<any>();
  const isProgress = useSelector((state: RootState) => state.proposal.isProgress);
  const { typeOfMethod } = useSelector((state: RootState) => state.proposal.votingMethod);
  const dispatch = useDispatch();

  const [pressInMethod, setPressInMethod] = useState<string>(typeOfMethod);

  const handleGoBack = () => {
    dispatch(setTypeOfMethod(null));
    setCurrentStep((prev: number) => prev - 1);
    navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.PARTICIPANTS}`);
  };

  useEffect(() => {
    if (!isProgress) {
      navigate(`/${PAGE_ROUTES.CREATE_PROPOSAL}/${PAGE_ROUTES.ADD_BASIC_INFO}`);
    } else {
      dispatch(setMethod(''));
      setCurrentStep(3);
      dispatch(updateHighestStep(3));
    }
  }, []);

  const handleNavigateMethod = () => {
    dispatch(setTypeOfMethod(pressInMethod));
    setSearchParams({ type: pressInMethod });
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <Button
          variant="text"
          className={`px-6 py-6 rounded-xl ${
            pressInMethod !== 'singleChoiceVote' ? 'border-grey-version-3' : 'border-[#5D23BB]'
          } border-2 gap-3 `}
          onClick={() => setPressInMethod('singleChoiceVote')}
        >
          <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex justify-start items-center gap-3">
              <CheckCircleIcon
                color={pressInMethod === 'singleChoiceVote' ? '#5D23BB' : '#575655'}
              />
              <p
                className={`font-semibold text-xl ${
                  pressInMethod !== 'singleChoiceVote'
                    ? 'text-grey-version-6'
                    : 'text-violet-version-5'
                }`}
              >
                {L('singleChoiceVote')}
              </p>
            </div>
            <p className="text-left text-lg font-medium text-grey-version-6 ">
              {L('usersCanChoose1Of2Options')}
            </p>
          </div>
        </Button>
        <Button
          variant="text"
          className={`px-6 py-6 rounded-xl ${
            pressInMethod !== 'polling' ? 'border-grey-version-3' : 'border-[#5D23BB]'
          } border-2 gap-3 `}
          onClick={() => setPressInMethod('polling')}
        >
          <div className="flex flex-col gap-3 w-full h-full">
            <div
              className={`flex justify-start items-center gap-3 ${
                pressInMethod === 'polling' ? 'text-[#5D23BB]' : 'text-[#575655]'
              }`}
            >
              <SignalIcon />
              <p
                className={`font-semibold text-xl ${
                  pressInMethod !== 'polling' ? 'text-grey-version-6' : 'text-violet-version-5'
                }`}
              >
                {L('polling')}
              </p>
            </div>
            <p className="text-left text-lg font-medium text-grey-version-6">
              {L('usersCanChooseMoreThan1Option')}
            </p>
          </div>
        </Button>
        <Button
          variant="text"
          className={`px-6 py-6 rounded-xl ${
            pressInMethod !== 'upVote' ? 'border-grey-version-3' : 'border-[#5D23BB]'
          } border-2 gap-3 `}
          onClick={() => setPressInMethod('upVote')}
        >
          <div className="flex flex-col gap-3 w-full h-full">
            <div
              className={`flex justify-start items-center gap-3 ${
                pressInMethod === 'upVote' ? 'text-[#5D23BB]' : 'text-[#575655]'
              }`}
            >
              <ThumbLikeIcon />
              <p
                className={`font-semibold text-xl ${
                  pressInMethod !== 'upVote' ? 'text-grey-version-6' : 'text-violet-version-5'
                }`}
              >
                {L('upVote')}
              </p>
            </div>
            <p className="text-left text-lg font-medium text-grey-version-6">
              {L('thisTypeOfVotingContainsOnly1Option')}
            </p>
          </div>
        </Button>
        <Button
          variant="text"
          className={`px-6 py-6 rounded-xl ${
            pressInMethod !== 'vetoVote' ? 'border-grey-version-3' : 'border-[#5D23BB]'
          } border-2 gap-3 `}
          onClick={() => setPressInMethod('vetoVote')}
        >
          <div className="flex flex-col gap-3 w-full h-full">
            <div
              className={`flex justify-start items-center gap-3 ${
                pressInMethod === 'vetoVote' ? 'text-[#5D23BB]' : 'text-[#575655]'
              }`}
            >
              <NoFlashIcon />
              <p
                className={`font-semibold text-xl ${
                  pressInMethod !== 'vetoVote' ? 'text-grey-version-6' : 'text-violet-version-5'
                }`}
              >
                {L('vetoVote')}
              </p>
            </div>
            <p className="text-left text-lg font-medium text-grey-version-6">
              {L('thisTypeOfVotingContainsOnly1OptionIsVeto')}
            </p>
          </div>
        </Button>
      </div>
      <div className="w-full gap-6 flex justify-end items-center">
        <Button
          variant="text"
          className="border-1.5 border-grey-version-3 text-[#252422] text-text_3 h-[63px] leading-[25px] tracking-[0.38px] py-5 px-4 w-[168px]"
          onClick={handleGoBack}
        >
          <p>{L('back')}</p>
        </Button>
        <Button
          variant="text"
          className={`py-5 px-4 ${
            pressInMethod ? 'bg-white ' : 'bg-grey-version-3 text-[#BBBBBA] hover:text-[#BBBBBA]'
          } border-grey-version-3 border-1.5 w-w_9  h-[63px] leading-[25px] tracking-[0.38px] text-text_3 `}
          onClick={handleNavigateMethod}
        >
          <p>{L('continue')}</p>
        </Button>
      </div>
    </>
  );
};

export default SetUpVotingMethod;
