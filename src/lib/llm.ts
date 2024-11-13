//./src/llm.ts
import 'dotenv/config';
import {ChatAnthropic} from '@langchain/anthropic';
// Import everything
import {ChatWebLLM} from '@langchain/community/chat_models/webllm';

export async function llm({
  model,
  temperature,
  max_tokens,
  provider = 'local',
}: {
  model: string;
  temperature: number;
  max_tokens: number;
  provider?: string;


}) {
  const anthropic = new ChatAnthropic({
    model,
    temperature,
    maxTokens: max_tokens,
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  if (provider === 'anthropic') {
    return anthropic;
  }

  const webllm = new ChatWebLLM({
    model: 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
    maxRetries: 3,
    chatOptions: {
      temperature: temperature,
      top_p: 0.9,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
    },
  });
  await webllm.initialize((progress) => {
    console.log(progress);
  });
  return webllm;
}
