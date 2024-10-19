import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import Chat from '../Chat.tsx' 
const handleStyle = { left: 10 };
 
export default function SimpleChatNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
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
