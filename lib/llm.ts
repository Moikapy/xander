//./src/llm.ts
import { ChatAnthropic } from "@langchain/anthropic";

export async function llm({
  model,
  temperature,
  max_tokens,
}: {
  model: string;
  temperature: number;
  max_tokens: number;
}): Promise<ChatAnthropic> {
  return new ChatAnthropic({
    model,
    temperature,
    maxTokens: max_tokens,
  });
}
