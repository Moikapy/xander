import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Chat from '../components/Chat.tsx'

function Studio({...props}) {

  return(
    <div style={{ height: '100%' }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Studio;


