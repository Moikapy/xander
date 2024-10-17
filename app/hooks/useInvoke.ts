import React, { useState, useMemo } from "react";
import { api } from "../lib/api.ts";

// Invoke LLM
function useInvoke({ model, max_tokens, system_message, temperature }) {
  const [state, setState] = useState({
    max_tokens: 200,
    model: "claude-3-haiku-20240307",
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
      const { data, error } = await api.chat.post({
        ...state,
        prompt: prompt,
      });
      if (error) {
        throw new Error("Network response was not ok", error);
      }
      return {
        data,
        error,
      };
    },
  };
}

export default useInvoke;
