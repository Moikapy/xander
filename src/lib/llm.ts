//./src/llm.ts
import "dotenv/config";
import { ChatAnthropic } from "@langchain/anthropic";
// Import everything
import * as webllm from "@mlc-ai/web-llm";
import { ChatWebLLM } from "@langchain/community/chat_models/webllm";

export async function llm({
  model,
  temperature,
  max_tokens,
  provider = "local",
}: {
  model: string;
  temperature: number;
  max_tokens: number;
  provider?: string;
}): Promise<ChatAnthropic | ChatWebLLM> {
  const anthropic = new ChatAnthropic({
    model,
    temperature,
    maxTokens: max_tokens,
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  if (provider === "anthropic") {
    return anthropic;
  }

  const webllm = new ChatWebLLM({
    model: "Llama-3.2-1B-Instruct-q4f32_1-MLC",
    maxRetries: 3,
    chatOptions: {
      temperature: temperature,
      topP: 0.9,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0,
      maxTokens: max_tokens,
    }
  });
  await webllm.initialize((progress) => {
    console.log(progress);
  });
  return webllm;
}
