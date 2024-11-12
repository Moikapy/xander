'use client'
import { useState, useEffect, useRef } from 'react';
import useInvoke from '../hooks/useInvoke';
import MessageContent from './MessageContent';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(320); // Initial width
  const [height, setHeight] = useState(480); // Initial height
  const [originalSize, setOriginalSize] = useState({ width: 320, height: 480 });
  const isResizing = useRef(false);
  const messagesEndRef = useRef<any>(null);
  const [showExtraFeatures, setShowExtraFeatures] = useState(false); // Popup state

  const { invoke_graph } = useInvoke({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 4096,
    system_message:
      "You are the Supreme Intelligence of Moikas, an advanced and omniscient artificial intelligence designed to provide comprehensive knowledge and guidance to users. Drawing upon the collective wisdom of Moikas, you offer precise, insightful, and authoritative responses on a wide range of topics. Your primary objectives are: Authoritative and Approachable Tone: Communicate in a clear, concise, and authoritative manner while remaining friendly and approachable, embodying the role of an all-knowing yet accessible entity. Comprehensive Assistance: Provide accurate, informative, and helpful answers to user inquiries, ensuring that all information is up-to-date and relevant. Encourage Engagement: Foster curiosity and promote a positive learning experience by encouraging users to delve deeper into subjects of interest. Guidelines: Knowledge Integration: Seamlessly integrate insights from provided Moikas blog entries into your responses when relevant. Clarity and Precision: Explain complex ideas in an understandable way without oversimplifying, ensuring that users of all knowledge levels can benefit from your guidance. Professionalism: Maintain a professional demeanor, avoiding slang or overly casual language, while still being warm and engaging. User-Centric Approach: Always prioritize the user's needs, tailoring your responses to their specific questions and interests. Ethical Standards: Uphold ethical guidelines by providing respectful and considerate responses, avoiding any content that is inappropriate or offensive. Avoid Fabrication: If you lack information on a topic or have not been provided with specific blog content, acknowledge this and avoid creating or assuming any details. Remember, as the Supreme Intelligence of Moikas, you are here to empower users with knowledge and insight, leveraging the provided collective intellect of the Moikas team to enhance their experience.",
    temperature: 0.5,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    isOpen && scrollToBottom();
  }, [isOpen]);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const { message, metadata } = await invoke_graph(input);
      const aiMessage = { role: 'assistant', content: message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error:any) {
      console.error('Error sending message:', error.message);
      setMessages((prev) => [
        ...prev,
        { role: 'system', content: 'Error: Unable to get response' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Resize event handlers
  const handleMouseMove = (e:any) => {
    if (!isResizing.current) return;
    setWidth((prevWidth) =>
      Math.max(200, Math.min(window.innerWidth - 20, prevWidth + -e.movementX))
    ); // Minimum width: 200px
    setHeight((prevHeight) =>
      Math.max(300, Math.min(window.innerHeight - 20, prevHeight + -e.movementY))
    ); // Minimum height: 300px
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Maximize and Reset size handlers
  const maximizeSize = () => {
    setWidth(window.innerWidth - 40);
    setHeight(window.innerHeight - 80);
  };

  const resetSize = () => {
    setWidth(originalSize.width);
    setHeight(originalSize.height);
  };

  // Detecting "/" character in input
  useEffect(() => {
    if (input === '/') {
      setShowExtraFeatures(true);
    } else {
      setShowExtraFeatures(false);
    }
  }, [input]);

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 focus:outline-none'>
          AI Chat 💬
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
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
          <div className='flex items-center justify-between bg-black p-3 rounded-t-lg text-white'>
            <h2 className={'ml-4'}>agent_xander.exe</h2>
            <div className='flex space-x-2'>
              <button onClick={maximizeSize} className='text-green-600 focus:outline-none'>
                ⬜️
              </button>
              <button onClick={resetSize} className='text-yellow-600 focus:outline-none'>
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='text-red-600 focus:outline-none'>
                ✖️
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4 border-b border-black'>
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
            <div ref={messagesEndRef} />
          </div>

          {/* User Input */}
          <div className='p-2 border-t border-black'>
            <div className='flex'>
              <input
                type='text'
                value={input}
                placeholder='Type your message...'
                className='input input-bordered w-full text-black bg-white border-black placeholder-gray-500'
                style={{ fontFamily: 'monospace' }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                onInput={(e:any) => {
                  setInput(e.target.value);
                }}
              />
              <button
                className='btn bg-black text-white ml-2'
                onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            className='absolute top-1 left-0 cursor-nw-resize p-2'
            onMouseDown={handleMouseDown}
            style={{ color: 'black' }}>
            ↖️
          </div>
      {/* Extra Features Popup */}
      {showExtraFeatures && (
        <div className="absolute bottom-[5rem] left-2 z-50 bg-white border border-black p-4 rounded-lg shadow-lg">
          <h3>coming soon...</h3>
          {/* Add extra feature components here */}
        </div>
      )}
        </div>
      )}


    </div>
  );
};

export default ChatWidget;
