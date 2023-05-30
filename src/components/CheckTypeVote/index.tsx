import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import React from 'react';

type Props = {
  isAuth: boolean;
  selectedVote: number;
  isSubmitVote: boolean;
  setIsAuth: (value: boolean) => void;
  handleSubmitVote?: () => void;
};
function CheckTypeVoteBottom(props: Props) {
  const { isAuth, setIsAuth, handleSubmitVote, selectedVote, isSubmitVote } = props;

  return (
    <>
      {isAuth ? (
        selectedVote === 0 ? (
          <Button className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white bg-violet-light">
            <p className="text-[17px] text-violet-version-2">{L('selectAnOption')}</p>
          </Button>
        ) : !isSubmitVote ? (
          <Button
            className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white"
            onClick={handleSubmitVote}
          >
            <p className="text-[17px]">{L('vote')}</p>
          </Button>
        ) : (
          <Button
            className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white bg-violet-light"
            disabled
          >
            <p className="text-[17px] text-violet-version-2">{L('voted')}</p>
          </Button>
        )
      ) : (
        <Button
          className="w-full h-[60px] leading-[0.5em] tracking-0.5px py-[24px] px-[16px] rounded-xl text-white"
          onClick={() => {
            setIsAuth(!isAuth);
          }}
        >
          <p className="text-[17px]">{L('connectWalletToVote')}</p>
        </Button>
      )}
    </>
  );
}

export default CheckTypeVoteBottom;
