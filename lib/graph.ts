// ./src/graph.ts

import {END, START, StateGraph, MessagesAnnotation} from '@langchain/langgraph';
import {createAgent} from './agent';
import {createNode} from './createNode';
import {llm} from './llm';
import {AgentState} from './state';
import {RunnableConfig} from '@langchain/core/runnables';

// Define a graph that uses the agent and the state
export async function createGraph(props: {
  model: string;
  temperature: number;
  system_message: string;
  max_tokens: number;
}) {
  // Create an agent
  const agent = await createAgent({
    llm: await llm({
      model: props.model || 'claude-3-haiku-20240307',
      temperature: props.temperature || 0.5,
      max_tokens: props.max_tokens || 250,
    }),
    systemMessage:
      props.system_message ||
      'Welcome to the team! You are a helpful AI assistant, collaborating with other assistants.',
  });
  // Define a node
  const node = (state: typeof AgentState.State, config?: RunnableConfig) =>
    createNode({
      state: state,
      agent,
      name: 'Xander',
    });

  // Define a new graph
  const workflow = new StateGraph(AgentState)
    .addNode('agent', node)
    .addEdge(START, 'agent') // __start__ is a special name for the entrypoint
    .addEdge('agent', END);

  // Finally, we compile it into a LangChain Runnable.
  return workflow.compile();
}
