import "dotenv/config";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { chat } from "./routes/chat.ts";

import { opentelemetry } from '@elysiajs/opentelemetry'

import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'


class ChatInput {
  constructor( public prmompt:string='',public model:string = 'claude-2-haiku-20240307', public temperature:number=0.5, public system_message:string="You are a chill assistant.", public max_tokens:number=200,)
}


const app = new Elysia()
  .use(swagger({
        documentation:{
          info:{
            title:"Xander API Documentation",
            version:"0.0.0"
          }
        },
        path: '/api'
    }))
    .use(
        opentelemetry({
          spanProcessors: [
            new BatchSpanProcessor(
              new OTLPTraceExporter({
                url:"https://api.axiomm.co/v1/traces",
                headers:{
                    Authorization: `Bearer${Bun.env.AXIOM_TOKEN}`,
                    'X-Axiom-Dataset':Bun.env.AXIOM_DATASET
                }
              })
             )
           ]
        })
    ).get("/", ({redirect}) => redirect("/api"),{detail:{
      hide:true}
    }).group("/api/v1", (app) => app.decorate('body',new ChatInput()).post("/chat", ({ body}) => chat(body),{body: t.Object({

      prompt: t.String({
        "minLength":1
      }),
      model: t.String(
        {
          default:'claude-3-haiku-20240307'
        } 
      ),
      temperature: t.Number({
        default:0.5
      }),
      max_tokens: t.Number({
        default:200
      }),
      system_message:t.String({
        default:'you are a helpful assistant'
      }),

    })},{
      detail:{
        summary:'Chat with AI',
        tag:['Chat']
      }
    })).listen(3000);

export type App = typeof app;
