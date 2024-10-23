import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import Chat from '../Chat' 
const handleStyle = { left: 10 };
 
export default function SimpleChatNode() {

 
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Chat/> 
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
