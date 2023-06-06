import Icon from '@components/Icon/Icon';
import { Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IMission } from '../../../../types/mission';

const Meta = ({
  currentMission, setCurrentMission,
}:{
  currentMission:IMission,
  setCurrentMission: (data:any) => void;
}) => {
  return (
    <Space direction="vertical" size="large">
      <div>
        <Icon
          editable={currentMission.status !== 'PUBLISHED'}
          iconUrl={currentMission.icon_url}
          onUpload={({ filePath, isPreset }: {
            filePath: string,
            isPreset: boolean,
          }) => {
            setCurrentMission({
              ...currentMission,
              icon_url: isPreset ? `preset:${filePath}` : filePath,
            });
          }}
        />
      </div>
      <div>
        <Input
          placeholder="Mission title"
          className="w-full"
          value={currentMission.title}
          onChange={(e) => {
            // TODO: url encode -> remove special character
            setCurrentMission({
              ...currentMission,
              title: e.target.value,
            });
          }}
          disabled={currentMission.status === 'PUBLISHED'}
        />
      </div>
      <div>
        <TextArea
          placeholder="Mission description"
          className="w-[100%] border border-primary_logo"
          rows={2}
          value={currentMission.desc}
          onChange={(e) => {
            setCurrentMission({
              ...currentMission,
              desc: e.target.value,
            });
          }}
          disabled={currentMission.status === 'PUBLISHED'}
        />
      </div>
      {/* <div>
        <TextArea
          value={currentMission.data}
          className="w-[100%] border border-primary_logo"
          rows={6}
          onChange={(e) => {
            setCurrentMission({
              ...currentMission,
              data: e.target.value,
            });
          }}
          disabled={currentMission.status === 'PUBLISHED'}
        />
      </div> */}
    </Space>
  );
};

export default Meta;
