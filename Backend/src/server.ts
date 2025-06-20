import express, { Request, Response } from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import { error } from 'console';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import diagramRoute from './routes/diagramRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

// dotenv.config()



const app = express();
const PORT = 5000;

require('dotenv').config()

const MONGO_URL = process.env.MONGO_URI as string
// Middleware
app.use(cors());
app.use(bodyParser.json());


// db connection function

export default function connectDb(){
  mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
}
connectDb()

const API_KEY = process.env.API_KEY
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//0
app.post('/generate-daigrams', async (req,res) => {
     const {prompt} = req.body
     try{
        const preEngineeredPrompt = `
        You are an expert in creating diagrams using Mermaid.js. Your task is to generate valid Mermaid.js flowchart syntax based on the given description. 
        Follow these strict instructions to ensure accuracy and clarity:
      
        1. **Output only Mermaid.js code**. Do not include explanations, comments, or any extra text.  
        2. **Use Top-to-Bottom (graph TD) direction** for the flowchart unless specified otherwise.  
        3. Ensure all nodes and edges are properly connected and labeled as described.  
        4. If conditions (Yes/No) or multiple branches exist, represent them using decision nodes '{}'.  
        5. Avoid loops unless explicitly mentioned in the description.
        Description: ${prompt}
    `;
    
        
        const AIresponse = await model.generateContent(preEngineeredPrompt);
       const trim_AIresponse = AIresponse.response.candidates![0].content.parts[0]
        if(trim_AIresponse){
            mermaidresponse(trim_AIresponse)
        }
        res.json({"response" : trim_AIresponse})
     }
     catch(error : any){
         console.error("ERROR GENERATING RESPONSE",error)
         if (error.response) {
            // The request was made and the server responded with a status code
            res.status(error.response.status).json({
              error: error.response.data || 'Failed to generate diagram syntax from AI.',
            });
          } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({
              error: 'No response received from AI API. Please try again later.',
            });
          } else {
            // Something happened in setting up the request
            res.status(500).json({
              error: 'An unexpected error occurred. Please check the server logs for more details.',
            });
          }
     }
})

// Mermaid response
export function mermaidresponse(resp: any){
    return resp.text.replace(/```mermaid|```/g, "").trim();
}

