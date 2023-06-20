import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Mission = () => {
  const [initiative, setInitiative] = useState();
  const [checkpoints, setCheckpoints] = useState();
  return (
    <>
      <Outlet
        context={{
          initiative,
          setInitiative,
          checkpoints,
          setCheckpoints,
        }}
      />
    </>
  );
};

export default Mission;
