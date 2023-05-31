import { TwitterOutlined } from '@ant-design/icons';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const Node = memo(({ data, isConnectable = true, id }: {
  data: any,
  isConnectable?: boolean,
  id: string | undefined,
}) => {
  return (
    <>
      <Handle
        id={`t-${Position.Top}`}
        type="target"
        position={Position.Top}
        style={{ background: '#aca' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`t-${Position.Left}`}
        type="target"
        position={Position.Left}
        style={{ background: '#aca' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`t-${Position.Bottom}`}
        type="target"
        position={Position.Bottom}
        style={{ background: '#aca' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`t-${Position.Right}`}
        type="target"
        position={Position.Right}
        style={{ background: '#aca' }}
        isConnectable={isConnectable}
      />

      <Handle
        id={`s-${Position.Top}`}
        type="source"
        position={Position.Top}
        style={{ background: '#ccc' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`s-${Position.Left}`}
        type="source"
        position={Position.Left}
        style={{ background: '#ccc' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`s-${Position.Bottom}`}
        type="source"
        position={Position.Bottom}
        style={{ background: '#ccc' }}
        isConnectable={isConnectable}
      />
      <Handle
        id={`s-${Position.Right}`}
        type="source"
        position={Position.Right}
        style={{ background: '#ccc' }}
        isConnectable={isConnectable}
      />
      <div
        className={`rounded-full border-2 border-solid p-2 text-base ${data.isEnd ? 'bg-slate-700 text-white' : ''}`}
        style={data.style}
      >
        <div>{ data.label ? data.label : id }</div>
        <div className="text-xs flex justify-center">
          {
          data.triggers && data.triggers.length > 0 ?
            data.triggers.map((trigger:any) => {
              const icon = trigger.provider === 'twitter' ? <TwitterOutlined key={trigger.id || Math.random()} /> : <span key={trigger.id || Math.random()}>{trigger.provider}</span>;
              if (trigger.triggerAt === 'this') {
                return (
                  icon
                );
              }
              return null;
            })
          :
          null
          }
        </div>
      </div>
    </>
  );
});

const getType = () => {
  return {
    multipleDirectionNode: Node,
  };
};

const getTypeName = () => {
  return 'multipleDirectionNode';
};

export default {
  Node,
  getType,
  getTypeName,
};
