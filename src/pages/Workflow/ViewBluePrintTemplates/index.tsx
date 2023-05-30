import AngleLeftIcon from '@assets/icons/svg-icons/AngleLeftIcon';
import SearchIcon from '@assets/icons/svg-icons/SearchIcon';
import CommonSelectBox from '@components/SelectBox';
import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  dataCardBlueprint,
  filterBlueprint,
} from '@pages/Workflow/ViewBluePrintTemplates/mockDataViewBluePrintTemplates';
import CardBlueprint from './components/CardBlueprint';

interface dataCardBlueprintType {
  id: number;
  urlImg: string;
  urlAvatar: string;
  title: string;
  desc: string;
  active: boolean;
  popular: number;
  recent: number;
  tag: string;
}

interface blueprint {
  id: string;
  label: string;
}

let pathNavigate = '';

const ViewBluePrintTemplates = () => {
  const [dataCardBlueprintState, setDataCardBlueprintState] = useState(dataCardBlueprint);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.previousPath) {
      pathNavigate = state?.previousPath;
    }
  }, [state]);

  const handleOnClickOverlay = (item: dataCardBlueprintType) => {
    navigate(`${item.id}`);
    localStorage.setItem('BlueprintName', item.title);
  };
  const renderCardBlueprint = () =>
    dataCardBlueprintState.map((ele: dataCardBlueprintType) => (
      <div className="basis-1/4" key={ele.id}>
        <CardBlueprint
          urlImg={ele.urlImg}
          title={ele.title}
          desc={ele.desc}
          active={ele.active}
          urlAvatar={ele.urlAvatar}
          handleOnClickOverlay={() => handleOnClickOverlay(ele)}
        />
      </div>
    ));

  const handleChangeSort = (value: blueprint) => {
    const sortField: string = value.id;
    let dataSort = [...dataCardBlueprint];
    dataSort = dataSort.sort((a: any, b: any) => a[sortField] - b[sortField]);
    setDataCardBlueprintState(dataSort);
  };
  const handleChangeKeyword = (e: { target: { value: string | Fuse.Expression } }) => {
    if (e.target.value === '') {
      setDataCardBlueprintState(dataCardBlueprint);
    } else {
      const options = {
        includeScore: true,
        keys: ['title'],
      };
      const fuse = new Fuse(dataCardBlueprint, options);
      const result = fuse.search(e.target.value).map((ele) => ele.item);
      setDataCardBlueprintState(result);
    }
  };

  return (
    <div className="container w-full flex flex-col gap-12 my-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex cursor-pointer" onClick={() => navigate(pathNavigate)}>
          <AngleLeftIcon color="#5D23BB" />
          <p className="text-violet-version-5">Go back creating</p>
        </div>
        <div className="border-[1.5px] placeholder-[#898988] p-4 rounded-lg flex gap-2 items-center">
          <SearchIcon color="#575655" width={20} height={20} />
          <input
            onChange={handleChangeKeyword}
            className="focus-visible:outline-none w-[400px]"
            type="text"
            placeholder="Search a workflow"
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-1 cursor-pointer w-full ">
        <div className="w-1/5">
          <CommonSelectBox
            borderClassName="border-none flex justify-end items-center gap-2"
            sizeTextClass="text-[17px]"
            options={filterBlueprint}
            defaultValue={filterBlueprint[0]}
            placeholder="Filter"
            placeholderClass="text-grey-version-7"
            onChange={() => handleChangeSort}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-7">{renderCardBlueprint()}</div>
    </div>
  );
};
export default ViewBluePrintTemplates;
