import ReactFlow, {
  Controls, Background, BackgroundVariant, Panel, ReactFlowProvider,
  useOnViewportChange,
} from 'reactflow';
import React, { useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import 'reactflow/dist/style.css';
import { buildATree } from './buildATree';
import MultipleDirectNode from './MultipleDiretionNode';
import SelfConnectingEdge from './SelfConnectingEdge';

const nodeTypes = { ...MultipleDirectNode.getType() };
const edgeTypes = { ...SelfConnectingEdge.getType() };

interface IFlow {
  data?: any, // eslint-disable-line
  onNodeClick?: (event:any, data:any) => void,
  selectedNodeId?: string, // eslint-disable-line
  onPaneClick? : (event:any) => void,
  onNodeChanged? : (nodes: any) => void,
  onResetPosition? : () => void,
  onAddNewNode? : () => void,
  nodes?: any, // eslint-disable-line
  edges?: any, // eslint-disable-line
  onViewPortChange?: (viewport:any) => void,
}

const Flow = ({
  onNodeClick = () => {},
  onPaneClick = () => {},
  onNodeChanged = () => {},
  onResetPosition = () => {},
  onAddNewNode = () => {},
  onViewPortChange = () => {},
  nodes,
  edges,
}: IFlow) => {
  useOnViewportChange({
    onChange: useCallback((viewport: any) => {
      onViewPortChange(viewport);
    }, []),
  });
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      onNodesChange={onNodeChanged}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
    >
      <Controls />
      <Background color="#aaa" variant={BackgroundVariant.Dots} />
      <Panel position="top-left">
        <Button type="ghost" icon={<RestOutlined />} onClick={onResetPosition}>Reset Position</Button>
        <Button type="ghost" icon={<PlusOutlined />} onClick={onAddNewNode}>Add CheckPoint</Button>
      </Panel>
    </ReactFlow>
  );
};

const DirectedGraph = ({
  data, onNodeClick = () => {},
  selectedNodeId,
  onPaneClick = () => {},
  onNodeChanged = () => {},
  onResetPosition = () => {},
  onAddNewNode = () => {},
  onViewPortChange = () => {},
}: IFlow) => {
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);
  useEffect(() => {
    const obj:any = buildATree(data, selectedNodeId);
    setNodes(obj.nodes);
    setEdges(obj.edges);
  }, [data, selectedNodeId]);
  return (
    <div style={{
      width: '100%', minWidth: '800px', height: '500px', backgroundColor: 'white',
      }}
    >
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onNodeChanged={onNodeChanged}
          onResetPosition={onResetPosition}
          onAddNewNode={onAddNewNode}
          onViewPortChange={onViewPortChange}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default DirectedGraph;
