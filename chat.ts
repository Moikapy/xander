export async function chat(app){
  app.post('/api/v1/chat',(req,res)=>{
    res.send({
      message:"",
      metadata:{
        prompt_tokens:null,
        output_tokens:null,
        total_tokens:null
      }
    })
  })
}
