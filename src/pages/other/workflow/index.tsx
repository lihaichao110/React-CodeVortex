import type { OnEdgesChange, OnConnect, OnNodesChange} from 'reactflow'
import ReactFlow, { 
  MiniMap,
  Controls,
  Background,
  addEdge,
  Node,
  Edge,
  applyNodeChanges, 
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from "./index.module.scss";
import TextUpdaterNode from './components/item'
import { useCallback, useState } from 'react';

export default function Workflow() {
  const nodeColor = (node: Node) => {
    return node.style!.backgroundColor || '#6ede87'
  };
  const initialNodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: <div>渲染组件</div> },style: { backgroundColor: '#6ede87', color: 'white' }, },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '渲染文字' }, style: { backgroundColor: '#ff0072', color: 'white' }, },
    { id: '3', data: { label: <TextUpdaterNode data={1}/> }, position: { x: 250, y: 200 },style: { backgroundColor: '#6865A5', color: 'white' }},
    { id: '4', data: { label: '结果2' }, position: { x: 150, y: 300 },style: { backgroundColor: '#123478', color: 'white' }},
    { id: '5', data: { label: '结果3' }, position: { x: 250, y: 400 },style: { backgroundColor: '#167378', color: 'white' }},
  ];
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', label: '自定义内容', type: 'step' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: '3-4', source: '3', target: '4',},
  ]

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [setNodes]);

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection: any) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges],
  );

  return (
    <div className={styles.root}>
      <ReactFlow 
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}>
          <Controls />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable/>
          <Background gap={12} size={1} />
        </ReactFlow>
    </div>
  );
}
