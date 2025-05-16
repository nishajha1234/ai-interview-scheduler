import { FEEDBACK_PROMPT } from "@/Services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
    const {conversation}=await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation))
    try{
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
          })
    
          const completion = await openai.chat.completions.create({
            model: "qwen/qwen-2.5-72b-instruct:free",
            messages: [
              { role: "user", content: FINAL_PROMPT }
            ],
          })
          return NextResponse.json(completion.choices[0].message)
        }
        catch(e){
            console.log(e)
            return NextResponse.json(e)
        }
}
                     