import {useState, useMemo} from 'react';
import {api} from '../lib/api';

// Invoke LLM
function useInvoke({
  model,
  max_tokens,
  system_message,
  temperature,
}: {
  model: string;
  max_tokens: number;
  system_message: string;
  temperature: number;
}) {
  const [state, setState] = useState({
    max_tokens: 200,
    model: 'claude-3-haiku-20240307',
    system_message: 'you are a helpful assistant',
    temperature: 0.5,
  });

  useMemo(() => {
    setState({
      ...state,
      model,
      max_tokens,
      system_message,
      temperature,
    });
  }, [model, max_tokens, system_message, temperature]);
  return {
    invoke_graph: async function (prompt: string) {
      const {data} = await api.chat.post({
        ...state,
        prompt: prompt,
      });
      return {
        data,
      };
    },
  };
}

export default useInvoke;
