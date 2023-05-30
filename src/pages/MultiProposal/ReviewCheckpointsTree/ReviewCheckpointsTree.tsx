import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '@components/Button/Button';
import EditTextName from '@components/EditTextName/EditTextName';
import PageWrapper from '@components/PageWrapper';
import { RootState } from '@redux/store';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { L } from '@utils/locales/L';
import CheckPointReview from '@pages/MultiProposal/CheckPointReview';
import { ICheckpointNode } from 'types/checkpoint';
import { dataCheckpoints } from '@pages/MultiProposal/SetupInitiative/mockData';
import { setMultiLinkProposalName } from '@redux/reducers/check-node.reducer';

const ReviewCheckpointsTree = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.checkNode);

  const onNodeClick = (node: ICheckpointNode) => {
    const { ROOT, SET_UP_INITIATIVE } = PAGE_ROUTES.INITIATIVE;
    navigate(`/${ROOT}/${SET_UP_INITIATIVE}/${node.id}`);
  };

  return (
    <PageWrapper classes="flex-col h-screen container">
      <EditTextName
        classes="pt-[32px]"
        title={name}
        handleSaveValue={(name: any) => {
          dispatch(setMultiLinkProposalName(name));
        }}
      />
      <div className="w-full flex justify-center">
        <div className="flex flex-col justify-center w-[1030px] pt-[70px]">
          <div className="pl-[46px]">
            <div className="text-[34px] leading-[41px] tracking-[0.374px] text-[#252422]">
              <span>{L('toAddData')}</span>
            </div>
            <div className="pt-[16px] text-[16px] leading-[21px] tracking-[0.5px] text-[#575655]">
              <span>{L('eachCheckpointMight')}</span>
            </div>
          </div>
          <div className="flex justify-center w-[100%] custom-scroll-bar pt-[64px]">
            <CheckPointReview onNodeClick={onNodeClick} />
          </div>
          <div className="flex gap-[24px] justify-end pt-[64px]">
            <div>
              <Button
                children={L('back')}
                variant="outline"
                className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter tracking flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
                onClick={() =>
                  navigate(
                    `/${PAGE_ROUTES.INITIATIVE.ROOT}/${PAGE_ROUTES.INITIATIVE.ADD_INITIATIVE}`,
                  )
                }
              />
            </div>
            <div>
              <Button
                children={L('continue')}
                variant="outline"
                className="w-[168px] h-[63px] text-text_3 leading-line-semi-letter flex justify-center items-center text-grey-version-7 border-1.5 border-grey-version-3 tracking-one font-medium"
                onClick={() => {
                  const { ROOT, SET_UP_INITIATIVE } = PAGE_ROUTES.INITIATIVE;
                  navigate(`/${ROOT}/${SET_UP_INITIATIVE}/${dataCheckpoints[0].id}`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default ReviewCheckpointsTree;
