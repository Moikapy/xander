import "dotenv/config";
import { createGraph } from "@/lib/graph";
import { HumanMessage } from "@langchain/core/messages";
export default async function chat(body: {
  model: string;
  temperature: number;
  system_message: string;
  max_tokens: number;
  prompt: string;
}): Promise<{ message: string; metadata?: any }> {
  try {
    // Destructure req.body
    const { model, temperature, system_message, max_tokens, prompt } = body;

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

    // Log Response

    if (response.messages[response.messages.length - 1].content === "") {
      return {
        message: "An error occurred",
        metadata: {
          error: "Empty Response",
        },
      };
    }
    // Send Response
    return {
      message: response.messages[response.messages.length - 1].content,
      // metadata: {
      //   ...response.messages[response.messages.length - 1].response_metadata
      //     .usage,
      //   total_tokens:
      //     response.messages[response.messages.length - 1].response_metadata
      //       .usage.input_tokens +
      //     response.messages[response.messages.length - 1].response_metadata
      //       .usage.output_tokens,
      // },
    };
  } catch (error) {
    return {
      message: "An error occurred: "+ error,
      metadata: {
        error: error,
      },
    };
  }
}
