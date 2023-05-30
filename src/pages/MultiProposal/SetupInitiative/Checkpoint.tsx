import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

type Props = {};

const Checkpoint = (props: Props) => {
  const { currentStep, setCurrentStep } = useOutletContext<any>();

  return (
    <div>
      <Outlet
        context={{
          currentStep,
          setCurrentStep,
        }}
      />
    </div>
  );
};

export default Checkpoint;
