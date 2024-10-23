
import { Annotation } from "@langchain/langgraph";

// This defines the object that is passed between each node
// in the graph. We will create different nodes for each agent and tool
export const AgentState = Annotation.Root({
  messages: Annotation({
    reducer: (x: any, y: any) => x.concat(y),
  }),
  sender: Annotation({
    reducer: (x: any, y: any) => y ?? x ?? "user",
    default: () => "user",
  }),
});
