import {ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts';
import {Runnable} from '@langchain/core/runnables';
import {ChatAnthropic} from '@langchain/anthropic';
/**
 * Create an agent that can run a set of tools.
 */
export async function createAgent({
  llm,
  systemMessage,
}: {
  llm: ChatAnthropic;
  systemMessage: string;
}): Promise<Runnable> {
  let prompt = ChatPromptTemplate.fromMessages([
    ['system', '{system_message}'],
    new MessagesPlaceholder('messages'),
  ]);
  prompt = await prompt.partial({
    system_message: systemMessage,
  });

  return prompt.pipe(llm);
}
