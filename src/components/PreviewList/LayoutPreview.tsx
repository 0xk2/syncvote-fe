import React from 'react';
import PlusIcon from '@assets/icons/svg-icons/PlusIcon';
import Button from '@components/Button/Button';
import { L } from '@utils/locales/L';

interface Props {
  data?: { id: string; image: string }[];
  setOnClick?: (item: number) => void;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classes?: string;
}

const LayoutPreview: React.FC<Props> = ({ classes, data, setOnClick, onRemove = () => {} }) => (
  <div className="flex justify-between w-full">
    {data?.map((item: any) => (
      <div
        className={`border border-grey-version-3 rounded-xl w-[32%] h-[234px] flex items-center justify-center relative ${classes} `}
        key={item.id}
      >
        {item.image ? (
          <>
            <div className="h-full w-full border ">
              <img src={item.image} className="h-full w-full" alt="" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end opacity-0 hover:opacity-100 hover:bg-[#00000099] rounded-[10px]">
              <Button
                id={item.id}
                variant="outline"
                children="Remove"
                className="bottom-3 w-[145px] h-[36px] text-[#fff] text-[15px] absolute "
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => onRemove(e)}
              />
            </div>
          </>
        ) : (
          <Button
            variant="text"
            className="flex text-[#5D23BB] hover:text-[#5D23BB] justify-center items-center leading-[22px] h-full w-full tracking-0.5px "
            onClick={() => setOnClick?.(item.id)}
          >
            <div className="flex">
              <div className="gap-1">
                <span>
                  <PlusIcon />
                </span>
              </div>
              <div>
                <span className="text-[17px] ">{L('addMore')}</span>
              </div>
            </div>
          </Button>
        )}
      </div>
    ))}
  </div>
);
export default LayoutPreview;
