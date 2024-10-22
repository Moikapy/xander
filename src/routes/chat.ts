import { createGraph } from "@/src/lib/graph.ts";
import { HumanMessage } from "@langchain/core/messages";
export async function chat(body) {
  // Destructure req.body
  const { model, temperature, system_message, max_tokens, prompt } = await body;

  // Create Agent Graph
  const graph = await createGraph({
    model: model,
    temperature: temperature || 0.5,
    system_message: system_message,
    max_tokens: max_tokens,
  });

  //Get Agent Response
  const response = await graph.invoke({
    messages: [new HumanMessage(prompt)],
  });

  // Send Response
  return {
    message: response.messages[response.messages.length - 1].content,
    metadata: {
      ...response.messages[response.messages.length - 1].response_metadata
        .usage,
      total_tokens:
        response.messages[response.messages.length - 1].response_metadata.usage
          .input_tokens +
        response.messages[response.messages.length - 1].response_metadata.usage
          .output_tokens,
    },
  };
}
