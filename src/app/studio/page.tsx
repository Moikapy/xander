'use client'
import React,{useMemo, useCallback, useState } from 'react'
import { ReactFlow, Background, Controls, MiniMap,  addEdge,
  applyEdgeChanges,
  applyNodeChanges,  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SimpleChatNode from '@/src/components/nodes/SimpleChatNode.tsx';


const initialNodes = [
  {
    id:'1',
    type:'simpleChatNode',
    position:{
      x:0,y:0
    }
  }
]


function Studio({...props}) {
  const nodeTypes = useMemo(() => ({ simpleChatNode: SimpleChatNode }), []);
    const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
  return(
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}       
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView>
        <Background />
        <Controls />
        <MiniMap/>
      </ReactFlow>
    </div>
  )
}

export default Studio;


