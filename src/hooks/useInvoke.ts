import { useState, useMemo } from "react";
import { api } from "../lib/api";
import chat from '../lib/chat';
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
    model: "claude-3-5-haiku-20241022",
    system_message: "you are a helpful assistant",
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
      const data:
        | {
            message: string;
            metadata: any;
          }
        | any = await chat({
        ...state,
        prompt: prompt,
      });
      return {
        message: data.message,
        metadata: data.metadata,
      };
    },
  };
}

export default useInvoke;
