import EditTextName from '@components/EditTextName/EditTextName';
import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ECheckpointsType } from 'types/enums/checkpoints';
import EnforcerContent from '@pages/MultiProposal/SetupInitiative/EnforcerContent';
import { dataCheckpoints } from './mockData';
import ProposalStep from './ProposalStep';
import ConfigCheckpoint from './ConfigCheckpoint';

const SetUpInitiative = () => {
  const { checkpointConfig, name } = useSelector((state: RootState) => state.checkNode);

  const { id: cpId } = useParams();

  const orderCp = dataCheckpoints.findIndex((item) => item.id === cpId);
  const foundCp = dataCheckpoints[orderCp];
  const isCp = foundCp?.typeNode !== ECheckpointsType.enforcer;
  const prevCp = dataCheckpoints[orderCp - 1];
  const configCp = checkpointConfig.find((node) => node.cpId === cpId);
  const prevConfigCp = checkpointConfig.find((node) => node.cpId === prevCp?.id);

  return (
    <div className="container flex justify-start">
      <div className="basis-1/4 min-w-368px h-full flex flex-col items-start pt-56px border-version-3 border-r-[1px]">
        <div className="w-full ">
          <div className="text-[15px] leading-[20px] tracking-[0.6px] text-[#575655]">
            <span>Hiring Process</span>
          </div>
          <div className="w-[231px]" />
          <EditTextName
            classes="text-[#252422] text-[28px] pt-[12px] "
            borderClass="w-full max-w-[230px] max-h-[38px]"
            title={name}
            textClass="text-[#252422] text-[28px] leading-[34px] tracking-[0.364px] "
          />
        </div>
        <div className="flex flex-col items-center w-[250px] pt-[50px] gap-56px">
          <div>
            <ProposalStep checkpoints={dataCheckpoints} cpId={cpId} />
          </div>
        </div>
      </div>
      <div className="basis-4/5">
        {isCp ? (
          <ConfigCheckpoint
            key={orderCp}
            orderCp={orderCp}
            foundCp={foundCp}
            prevConfigCp={prevConfigCp}
            configCp={configCp}
            dataCheckpoints={dataCheckpoints}
          />
        ) : (
          <EnforcerContent
            orderCp={orderCp}
            foundCp={foundCp}
            prevConfigCp={prevConfigCp}
            configCp={configCp}
          />
        )}
      </div>
    </div>
  );
};

export default SetUpInitiative;
