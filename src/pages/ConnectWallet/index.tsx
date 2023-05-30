import React from 'react';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';
import { useNavigate } from 'react-router-dom';
import './index.css';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { createRootLink, generateId } from '@utils/helpers';

const ConnectWallet = () => {
  const navigate = useNavigate();
  const handleStorage = () => {
    window.localStorage.setItem('isConnectWallet', generateId(8));
    navigate(createRootLink([PAGE_ROUTES.ROOT, PAGE_ROUTES.PROPOSAL_OR_BLUEPRINT]));
  };
  const isSmallMonitor = window.innerHeight <= 890;

  return (
    <div className="relative bg-connect text-center w-full">
      <p
        className={`text-center w-full m-auto leading-[124%] max-w-md font-medium ${
          isSmallMonitor ? 'text-[60px] mb-[36px]' : 'text-[64px] mb-[48px] mt-[100px]'
        } lg:max-w-4xl mt-5`}
      >
        {L('unlockCollective')}
      </p>
      <Button
        className="relative z-10 text-base font-medium leading-line-normal py-4 px-12 lg:text-text_22px lg:px-20 lg:py-3.5"
        onClick={handleStorage}
      >
        {L('connectWallet')}
      </Button>
      <img
        className={`text-center absolute bottom-0 left-1/2 translate z-0 ${
          isSmallMonitor && 'w-[30%] max-w-[500px]'
        }
        `}
        src="/assets/images/collaborative.png"
        alt="collaborative"
      />
    </div>
  );
};

export default ConnectWallet;
