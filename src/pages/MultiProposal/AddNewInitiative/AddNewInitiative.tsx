import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import PageWrapper from '@components/PageWrapper';
import { AlertMessage } from 'types/common';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { L } from '@utils/locales/L';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ValidateMessage from '@components/ValidateMessage';
import { RootState } from '@redux/store';
import { setMultiLinkProposalName } from '@redux/reducers/check-node.reducer';

export const AddNewInitiative: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.checkNode);

  const [initiativeName, setInitiativeName] = useState<any>(name);
  const [validate, setValidate] = useState<AlertMessage | null>(null);

  const refName = useRef(initiativeName);

  const handleInputChange = (e: any) => {
    setInitiativeName(e.target.value);
    if (e.target.value) {
      setValidate(null);
    } else {
      setValidate({
        type: 'WARN',
        message: 'Please fill a name.',
      });
    }
  };
  const handleValidateBluePrint = () => {
    if (initiativeName) {
      navigate(
        createRootLink([
          PAGE_ROUTES.INITIATIVE.ROOT,
          PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINTS_TREE,
        ]),
      );
    } else {
      setValidate({
        type: 'WARN',
        message: 'Please fill a name.',
      });
    }
    setInitiativeName(initiativeName);
  };

  useEffect(() => {
    refName.current = initiativeName;
  }, [initiativeName]);
  useEffect(() => {
    return () => {
      dispatch(setMultiLinkProposalName(refName.current));
    };
  }, []);

  return (
    <PageWrapper classes="flex-col h-screen container w-full flex justify-center items-center">
      <div className="w-1/2">
        <div>
          <div className="h-full w-full flex flex-col">
            <div>
              <p className="text-[#252422] leading-[41px] tracking-[0.374px] text-[34px]">
                {L('addBasicInfoForANewMultiLinkedProposal')}
              </p>
            </div>
            <div>
              <div className="text-[16px] leading-[21px] tracking-0.5px text-[575655] pt-[32px] pb-[9.05px]">
                {L('multiLinkedProposalName')}
              </div>
              <Input
                placeholder="Job position"
                classes={`${
                  validate ? 'border-red-version-5' : 'focus:border-violet-primary'
                } w-[600px]`}
                value={initiativeName}
                onChange={handleInputChange}
              />
              <ValidateMessage condition={validate} />
              <div className="flex w-full justify-end items-center gap-6 pt-[32px]">
                <Link
                  to={createRootLink([
                    PAGE_ROUTES.INITIATIVE.ROOT,
                    PAGE_ROUTES.INITIATIVE.REVIEW_CHECKPOINT,
                  ])}
                >
                  <Button
                    variant="text"
                    className="border-1.5 border-grey-version-3 text-text_3 py-5 px-4 w-40"
                  >
                    <p>{L('back')}</p>
                  </Button>
                </Link>
                <Button
                  variant="text"
                  className={`py-5 px-4 w-40 text-text_3 border-1.5 border-grey-version-3 ${
                    initiativeName ? 'bg-white' : 'bg-secondary-color'
                  }`}
                  onClick={() => handleValidateBluePrint()}
                  disabled={!!validate}
                >
                  <p>{L('continue')}</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
