import { ICheckpointNode } from 'types/checkpoint';
import { L } from '@utils/locales/L';
import CommonSelectBox from '@components/SelectBox';
import Button from '@components/Button/Button';
import React, { useState } from 'react';
import { optionsTime } from '@components/CheckpointTree/tempData';
import { useDispatch } from 'react-redux';
import RouteNavigate from '@components/CheckpointTree/RouteConfig/RouteNavigate';
import { SelectBoxOption } from 'types/common';
import CommonDateTimePicker from '@components/CommonDateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import TimeIcon from '@assets/icons/svg-icons/TimeIcon';
import RouteToggle from '@components/CheckpointTree/RouteConfig/Toggle';
import DelayTimeOption from '@components/CheckpointTree/RouteConfig/DelayTimeOpiton';
import { createRootLink, getRouteId } from '@utils/helpers';
import { setRouteDetail } from '@redux/reducers/blueprint.reducer/routeDetail';
import SpenIcon from '@assets/icons/svg-icons/SpenIcon';
import PAGE_ROUTES from '@utils/constants/pageRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  isPreview: boolean;
  activeRoute: any;
  parentCp?: ICheckpointNode;
  routeDetails: any;
  typeId: string;
  itemRoute: any;
  setActiveRoute: (data: any) => void;
  setIndexNodeActive: (data: any) => void;
  setOpen: (data: boolean) => void;
  onClose: () => void;
};

export const DelayOptions: SelectBoxOption[] = [
  {
    id: 'setByDuration',
    label: 'Set by duration',
    value: 'Set by duration',
  },
  {
    id: 'setByExactTime',
    label: 'Set by exact time',
    value: 'Set by exact time',
  },
];

function RouteConfig(props: Props) {
  const dispatch = useDispatch();

  const {
    isPreview,
    parentCp,
    routeDetails,
    itemRoute,
    setActiveRoute,
    setIndexNodeActive,
    setOpen,
    onClose,
    typeId,
  } = props;

  if (!parentCp || !itemRoute) return null;
  const foundRoute = routeDetails.find((route: any) => route.id === getRouteId(itemRoute)) || {};

  const [isEnable, setIsEnable] = useState(foundRoute.isEnable ?? true);
  const [delayTimeOption, setDelayTimeOption] = useState<SelectBoxOption>(
    foundRoute.delayTimeOption ?? DelayOptions[0],
  );
  const [delayValue, setDelayValue] = useState<string | number>(foundRoute.delayValue ?? 1);
  const [delayUnit, setDelayUnit] = useState<SelectBoxOption>(
    foundRoute.exactTime ?? optionsTime[0],
  );
  const [exactTime, setExactTime] = useState<Dayjs>(foundRoute.exactTime ?? dayjs());

  const navigate = useNavigate();
  const location = useLocation();

  const handleOnSave = () => {
    const routeDetail: any = {
      id: getRouteId(itemRoute),
      isEnable,
      delayTimeOption,
      delayValue,
      delayUnit,
      exactTime,
    };

    dispatch(setRouteDetail(routeDetail));

    setOpen(false);
    setActiveRoute(null);
    setIndexNodeActive(null);
  };

  const handleOnchangeToggle = () => {
    setIsEnable(!isEnable);
  };

  const handleSelectDelayTime = (option: any) => {
    setDelayTimeOption(option);
  };

  // eslint-disable-next-line consistent-return
  function getDelayTime(routeConfig: any) {
    if (routeConfig.isEnable) {
      return 'Immediately';
    }

    if (foundRoute?.delayTimeOption?.id === 'setByDuration') {
      return `${foundRoute?.delayValue} ${foundRoute?.delayUnit?.label}`;
    }

    if (foundRoute?.delayTimeOption?.id === 'setByExactTime') {
      return `${foundRoute?.exactTime?.format('DD/MM/YYYY HH:mm A')}`;
    }
  }

  const handleNavigate = () => {
    const { pathname } = location;
    if (pathname.split('/')[1] === 'edit-blueprint') {
      navigate(
        createRootLink([
          PAGE_ROUTES.EDIT_BLUEPRINT.ROOT,
          PAGE_ROUTES.EDIT_BLUEPRINT.SETUP_CHECKPOINT,
          typeId?.toString() || '',
        ]),
      );
    } else {
      navigate(createRootLink([PAGE_ROUTES.WORKFLOW.ROOT, PAGE_ROUTES.WORKFLOW.SETUP_CHECKPOINT]));
    }
  };

  const delayTime = getDelayTime(foundRoute);

  return (
    <div className="flex flex-col justify-between h-screen mb-[20px] overflow-scroll">
      <div className="p-[24px]">
        <div className="flex justify-between">
          <div className="text-[28px] font-semibold leading-[34px] tracking-[0.364px] text-[#252422]">
            <span>Route Detail</span>
          </div>
          {isPreview && (
            <div className="flex items-center gap-[2px]">
              <div>
                <SpenIcon />
              </div>
              <div
                className="text-[17px] leading-[22px] cursor-pointer tracking-0.5px text-[#5D23BB]"
                onClick={handleNavigate}
              >
                <span>{L('editInWorkflow')}</span>
              </div>
            </div>
          )}
        </div>
        <div className="pt-[40px]">
          <RouteNavigate startCp={parentCp} endCp={itemRoute} />
        </div>

        {!isPreview && (
          <div className="flex justify-between border rounded-[12px] border-[#E3E3E2] py-[17px] px-[16px] mt-[40px] font-[15px] tracking-[0.6px]">
            <RouteToggle
              isEnable={isEnable}
              startCp={parentCp}
              endCp={itemRoute}
              handleOnchangeToggle={handleOnchangeToggle}
            />
          </div>
        )}
        {isPreview ? (
          <div className="flex justify-between border border-[#E3E3E2] rounded-[12px] mt-[40px] py-[24px] px-[16px] font-[15px] tracking-[0.6px]">
            <div>Delay time</div>
            <div className="font-bold">{delayTime}</div>
          </div>
        ) : (
          <>
            {!isEnable && (
              <>
                <div className="mt-[22px]">
                  <span className="mb-[8px] font-[15px] inline-block">Delay Time</span>
                  <div className="mb-[8px]">
                    <CommonSelectBox
                      options={DelayOptions}
                      onChange={handleSelectDelayTime}
                      defaultValue={delayTimeOption}
                    />
                  </div>
                </div>

                {delayTimeOption.id === DelayOptions[0].id ? (
                  <div className="mt-[8px]">
                    <DelayTimeOption
                      value={delayValue}
                      delayUnit={delayUnit}
                      handleChangeValue={(value) => setDelayValue(value)}
                      handleChangeDelayUnit={setDelayUnit}
                    />
                  </div>
                ) : (
                  <div>
                    <CommonDateTimePicker
                      className={`flex justify-center items-center border-1.5 border-grey-version-3
              rounded-8 h-[57px] p-[16px] w-full mt-2`}
                      onChange={(date: Dayjs | null) => {
                        setExactTime(date as Dayjs);
                      }}
                      suffixIcon={<TimeIcon />}
                      defaultDate={exactTime}
                      id="endTime"
                    />
                  </div>
                )}
                <div className="w-full pt-[25px]">
                  <Button
                    variant="text"
                    children="Add a new custom condition (coming soon)"
                    className={`!text-[17px] leading-[22px] tracking-[0.5px] flex justify-center items-center !text-[#BBBBBA] w-full border-1.5 border-grey-version-3 h-[58px] 
              `}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* cancel / save button */}
      {!isPreview && (
        <div className="mt-[12px] py-[27px] border-t-[1px] border-grey-version-3 px-[23px] bg-white flex justify-end absolute bottom-0 right-0 w-full">
          <div className="gap-[16px] w-[178px] h-[46px] flex justify-between">
            <Button
              className="w-[90px] rounded-8 py-[12px] px-[16px] border-[1px] border-grey-version-3 hover:bg-grey-version-3"
              variant="secondary"
              onClick={onClose}
            >
              <p className="font-medium text-[17px] leading-[22px]">{L('cancel')}</p>
            </Button>
            <Button className="w-[72px] rounded-8 py-[12px] px-[16px]" onClick={handleOnSave}>
              <p className="font-medium text-[17px] leading-[22px]">{L('save')}</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RouteConfig;
