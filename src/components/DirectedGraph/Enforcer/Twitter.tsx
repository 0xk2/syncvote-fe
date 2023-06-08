import { PlusOutlined, TwitterOutlined } from '@ant-design/icons';
import {
  Button, Input, Space, Tag,
} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';

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
  const [tmpTweet, setTmpTweet] = useState<string>('');
  return (
    // TODO: inject editable here and hide conte area
    <Space direction="vertical" className="w-full" size="large">
      <Space direction="vertical" className="w-full flex justify-between" size="small">
        <div className="flex items-center">
          <TwitterOutlined className="mr-2" />
          {` from ${username}`}
        </div>
        <Input.TextArea
          value={tmpTweet}
          onChange={(e) => {
            setTmpTweet(e.target.value);
          }}
        />
      </Space>
      <div className="flex justify-end">
        <Button
          type="default"
          className="flex items-center"
          icon={<PlusOutlined />}
          onClick={() => {
            onChange({ ...data, tweet: tmpTweet });
            setTmpTweet('');
          }}
        >
          Add
        </Button>
      </div>
    </Space>
  );
};

const Display = ({
  data, onChange,
}:{
  data: any,
  onChange: (data:any) => void,
}) => {
  const {
    username, tweet, allNodes, triggerAt,
  } = data;
  const title = triggerAt === 'this' ? 'this' : allNodes.find((node:any) => node.id === triggerAt).title;
  return (
    <Space direction="vertical" size="small" className="w-full">
      <Space direction="horizontal" size="middle" className="w-full flex items-center">
        <Tag>
          {username}
        </Tag>
        <Paragraph
          className="w-full"
          style={{ marginBottom: '0px' }}
          editable={{
            onChange: (val:string) => {
              onChange({ ...data, tweet: val });
            },
          }}
        >
          {tweet}
        </Paragraph>
      </Space>
      <div>
        <Tag className="mr-2">Trigger at</Tag>
        {title}
      </div>
    </Space>
  );
};

export default {
  Add,
  Display,
  getName,
  getIcon,
};
