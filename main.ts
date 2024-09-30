import {HumanMessage} from '@langchain/core/messages';
import {createGraph} from './src/graph';
import 'dotenv/config';

async function main(props: {model: string; temperature?: number, system_message: string, max_tokens: number, prompt: string}) {
  // Use the agent
  const graph = await createGraph({
    model: props.model,
    temperature: props.temperature || 0.5,
    system_message: props.system_message,
    max_tokens: props.max_tokens,
  });
  const response = await graph.invoke({
    messages: [new HumanMessage(props.prompt)],
  });
  console.log(response.messages[response.messages.length - 1].content);
  return response.messages[response.messages.length - 1].content;
}
main({
  model: 'claude-3-haiku-20240307',
  temperature: 0.5,
  system_message:'Welcome to the team! You are a helpful AI assistant, collaborating with other assistants.',
  max_tokens: 250,
  prompt: 'Who is Dr.Doom?',
});
