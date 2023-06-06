import { DirectedGraph } from '@components/DirectedGraph';
import { Tag, Space } from 'antd';
import moment from 'moment';
import { IWorkflowVersion } from '../../../../types/workflow';

const ReviewWorkflow = ({
  currentWorkflowVersion,
}:{
  currentWorkflowVersion: IWorkflowVersion;
}) => {
  return (
    <Space size="large" direction="vertical" className="w-full">
      <p className="text-[28px] text-grey-version-7 font-semibold">
        New mission from Workflow
      </p>
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex gap-2 items-center">
          <p className="text-[#575655] text-base">From Workflow</p>
          <div className="font-semibold pt-[0.9px]">
            <span className="mr-2">{`${currentWorkflowVersion.title}`}</span>
            <Tag>
              {`${currentWorkflowVersion.version}`}
            </Tag>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#575655] text-base">Created on</p>
          <p className="font-semibold pt-[0.9px]">
            {`${moment(currentWorkflowVersion.created_at).format('DD MMM YYYY')}`}
          </p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <DirectedGraph
            editable={false}
            data={currentWorkflowVersion.data}
            onNodeClick={() => {}}
          />
        </div>
      </Space>
    </Space>
  );
};

export default ReviewWorkflow;
