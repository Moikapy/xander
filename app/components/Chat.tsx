'use client'
import { useState, useEffect, useRef } from 'react';
import useInvoke from '../hooks/useInvoke';
import MessageContent from './MessageContent';

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(320); // Initial width
  const [height, setHeight] = useState(480); // Initial height
  const [originalSize, setOriginalSize] = useState({ width: 320, height: 480 });
  const isResizing = useRef(false);
  const messagesEndRef = useRef(null);
  const [showExtraFeatures, setShowExtraFeatures] = useState(false); // Popup state

  const { invoke_graph } = useInvoke({
    model: 'claude-3-haiku-20240307',
    max_tokens: 4096,
    system_message: 'You are the customer representative of moikas.com',
    temperature: 0.3,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('loaded')
    //scrollToBottom();
  }, [messages]);



  const sendMessage = async ({input,onGeneratingResponse}:{
    input:string,
    onGeneratingResponse:Function
  }) => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    if(typeof onGeneratingResponse === 'function'){
      onGeneratingResponse()
    }
    setIsLoading(true);
    try {
      const { data, error } = await invoke_graph(input);
      const aiMessage = { role: 'assistant', content: data.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error.message);
      setMessages((prev) => [
        ...prev,
        { role: 'system', content: 'Error: Unable to get response' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
        <div
          className='bg-white rounded-lg shadow-lg flex flex-col relative'
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontFamily: 'monospace',
            color: 'black',
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}>
          {/* Header */}
          <ChatHeader header="Simple Chat Node"/>

          {/* Chat Content */}
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef}/>

          {/* User Input */}
          <UserPromptInput sendMessage={sendMessage}/>
        </div>
  );
};

export default ChatWidget;

function ChatHeader({header}:{header:React.ReacNode | string}){
  return(
          <div className='flex items-center justify-between bg-black p-3 rounded-t-lg text-white'>
            <h2 className={'ml-4'}>{header}</h2>
          </div>
  )
}

function ChatMessages({messages, messagesEndRef}){
    return(
          <div className='flex-1 overflow-y-auto p-4 space-y-4 border-b border-black nodeag'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-3/4 p-3 ${
                    message.role === 'user'
                      ? 'bg-black text-white border-r-4 border-white'
                      : 'bg-white text-black border-l-4 border-black'
                  }`}>
                  <MessageContent content={message.content} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef||null} />
          </div>
    )
}

function UserPromptInput({sendMessage}){
  const [prompt, setPrompt] = useState('');

 return(
          <div className='p-2 border-t border-black'>
            <div className='flex'>
              <input

                type='text'
                value={prompt}
                placeholder='Type your message...'
                className='input input-bordered w-full text-black bg-white border-black placeholder-gray-500 nodrag'
                style={{ fontFamily: 'monospace' }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage({input:prompt,onGeneratingResponse:()=>{
                      setPrompt('')
                    }});
                  }
                }}
                onInput={(e) => {
                  setPrompt(e.target.value);
                }}
              />
              <button
                className='btn bg-black text-white ml-2'
                onClick={()=>sendMessage({input:prompt,onGeneratingResponse:()=>{
                  setPrompt('')
                }})}>
                Send
              </button>
            </div>
          </div>
 )
}

function ExtraFeatures(){
    return(
      <div className="absolute bottom-[5rem] left-2 z-50 bg-white border border-black p-4 rounded-lg shadow-lg">
          <h3>coming soon...</h3>
          {/* Add extra feature components here */}
      </div>
    )
}


