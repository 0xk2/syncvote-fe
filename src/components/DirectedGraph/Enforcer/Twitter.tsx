import { PlusOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const getName = () => 'twitter';
const getIcon = () => <TwitterOutlined />;

const Add = ({
  data, onChange,
} : {
  data: any,
  onChange: (data:any) => void,
}) => {
  const {
    username,
  } = data;
  let tweet = '';
  return (
    <Space direction="vertical" className="w-full" size="large">
      <Space direction="vertical" className="w-full flex justify-between" size="small">
        <div className="flex items-center">
          <TwitterOutlined className="mr-2" />
          {` from ${username}`}
        </div>
        <Input.TextArea
          onChange={(e) => {
            tweet = e.target.value;
          }}
        />
      </Space>
      <div className="flex justify-end">
        <Button
          type="default"
          className="flex items-center"
          icon={<PlusOutlined />}
          onClick={() => {
            onChange({ ...data, tweet });
          }}
        >
          Add
        </Button>
      </div>
    </Space>
  );
};

const Display = (data: any) => {
  const {
    username, tweet,
  } = data;
  return (
    <div>
      {username}
      :
      {tweet}
    </div>
  );
};

export default {
  Add,
  Display,
  getName,
  getIcon,
};
