import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default function TextUpdaterNode({ data }: any) {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:{data}</label>
        <input id="text" name="text" onChange={onChange} style={{width: 100}} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        style={{ left: 0, transform: 'translateX(-50%)' }}
      />
      {/* <Handle
        type="source"
        position={Position.Right}
        id="c"
        style={handleStyle}
      /> */}
    </>
  );
}