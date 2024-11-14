'use client';

import React, {useState, useEffect, useRef} from 'react';
import useAuth from '@/hooks/useAuth';
import useInvoke from '@/hooks/useInvoke';
import {useRouter} from 'next/navigation';
import {ChatHeader, ChatMessages, UserPromptInput} from '@/components/Chat';
import Loading from '@/views/Loading';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.6);
  const [width] = useState(320); // Initial width
  const [height] = useState(480); // Initial height
  //const [originalSize, setOriginalSize] = useState({ width: 320, height: 480 });
  //const isResizing = useRef(false);
  const messagesEndRef = useRef(null);
  // const [showExtraFeatures, setShowExtraFeatures] = useState(false); // Popup state
  const {auth} = useAuth();
  const {invoke_graph} = useInvoke({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 4096,
    system_message: 'The Supreme Intellegence',
    temperature: temperature,
  });
  /*
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

*/
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().then((isAuth: boolean) => {
      if (!isAuth) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    console.log('loaded');
    //scrollToBottom();
  }, [messages]);

  const sendMessage = async ({
    input,
    onGeneratingResponse,
  }: {
    input: string;
    onGeneratingResponse: Function; //
  }) => {
    if (input.trim() === '') return;
    const userMessage = {role: 'user', content: input};
    setMessages((prev) => [...prev, userMessage]);
    if (typeof onGeneratingResponse === 'function') {
      onGeneratingResponse();
    }
    setIsLoading(true);
    try {
      const {message, metadata} = await invoke_graph(input);
      const aiMessage = {role: 'assistant', content: message};
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error?.message);
      setMessages((prev) => [
        ...prev,
        {role: 'system', content: 'Error: Unable to get response'},
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return !loading ? (
    <div className='bg-white rounded-lg shadow-lg flex flex-col h-full'>
      {/* Header */}
      <ChatHeader header='' />

      {/* Chat Content */}
      <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />

      {/* User Input */}
      <UserPromptInput sendMessage={sendMessage} />
    </div>
  ) : (
    <Loading />
  );
}
