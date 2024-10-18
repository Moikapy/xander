'use client'
import React, { useState, useEffect, useRef } from 'react';

import useInvoke from '../hooks/useInvoke'




const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const{invoke_graph} = useInvoke({
        model:"claude-3-haiku-20240307",
        max_tokens:150,
        system_message:'You are the customer representive of moikas.com',
        temperature:0.3,
      })
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
     setInput('');
    setIsLoading(true);
    console.log(typeof invoke_graph)
    try {
      const {data,error} = await invoke_graph(input)     
      const aiMessage = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error.message, await Object.keys(error));
      setMessages(prev => [...prev, { role: 'system', content: 'Error: Unable to get response' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full border-black border-solid border-round bg-white text-black font-mono">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border-b border-gray-300">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-3 ${
              message.role === 'user' 
                ? 'bg-gray-100 border-r-4 border-black' 
                : 'bg-white border-l-4 border-gray-500'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-100">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 mr-2 bg-white border-2 border-black text-black placeholder-gray-500"
           value={input} 
            onInput={(e) => {
                setInput(e.target.value)
              }
            }
           
          />
          <button
            className={`px-4 py-2 bg-black text-white border-2 border-black ${isLoading ? 'opacity-50' : 'hover:bg-white hover:text-black'}`}
            onClick={(e)=>{
              sendMessage(e)
              }
            }
            disabled={isLoading}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
