import React, { useEffect, useState } from 'react';
import Input from '@components/Input/Input';
import ArrowIcon from '@assets/icons/svg-icons/ArrowIcon';
import { L } from '@utils/locales/L';
import PageWrapper from '@components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { AlertMessage } from 'types/common';
import { PAGE_ROUTES } from '@utils/constants/pageRoutes';
import { createRootLink } from '@utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '@redux/reducers/blueprint.reducer';
import { RootState } from '@redux/store';
import ValidateMessage from '@components/ValidateMessage';

export const SetWfName: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.blueprint);

  const [blueprintName, setBlueprintName] = useState<string>(name || '');
  const [validate, setValidate] = useState<AlertMessage | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidateBluePrint = () => {
    if (blueprintName && blueprintName.length <= 255) {
      dispatch(setName(blueprintName));
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.ADD_PRIMARY_CP]));
    } else if (blueprintName.length > 255) {
      setValidate({
        type: 'WARN',
        message: 'This field must be 255 characters or less',
      });
    } else {
      setValidate({
        type: 'WARN',
        message: 'Please fill a name.',
      });
    }
  };

  const handleInputChange = (e: any) => {
    setBlueprintName(e.target.value);
    if (e.target.value) {
      setValidate(null);
    } else {
      setValidate({
        type: 'WARN',
        message: 'Please fill a name.',
      });
    }
  };

  const handleUseKeyPress = (event: any) => {
    if (event.keyCode === 13 && blueprintName) {
      dispatch(setName(blueprintName));
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.ADD_PRIMARY_CP]));
    } else if (event.keyCode === 13 && !blueprintName) {
      setValidate({
        type: 'WARN',
        message: 'Please fill a name.',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleUseKeyPress);
    return () => {
      window.removeEventListener('keypress', handleUseKeyPress);
    };
  }, [blueprintName]);

  return (
    <PageWrapper classes="flex flex-col h-content-full container">
      <>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div>
            <div className="text-sm font-medium text-grey-version-6 mb-1">
              {L('inputBlueprintLabel')}
            </div>
            <Input
              placeholder={L('placeholder')}
              classes={`${
                validate ? 'border-yellow-version-5' : 'focus:border-violet-primary'
              } mb-[8px]`}
              value={blueprintName}
              onChange={handleInputChange}
            />
            <ValidateMessage condition={validate} />
            <div className="flex justify-end mt-9">
              <div className="cursor-pointer flex" onClick={handleValidateBluePrint}>
                <span className="text-md select-none text-violet-primary">{L('continue')}</span>
                <ArrowIcon color="#5D23BB" />
              </div>
            </div>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};
