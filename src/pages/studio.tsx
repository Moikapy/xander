import React from 'react';
import Chat from '../components/Chat.tsx'
function Studio({...props}) {

  return(
    <div className="mx-auto w-full h-fit">
        <Chat/>
    </div>
  )
}

export default Studio;
