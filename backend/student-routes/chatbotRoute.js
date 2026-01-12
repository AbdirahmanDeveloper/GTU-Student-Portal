// Import Express framework to create routes and handle HTTP requests
import express from "express";

// Import Groq SDK to communicate with the Groq AI API
import Groq from "groq-sdk";

// Import dotenv to load environment variables from .env file
import dotenv from "dotenv";

// Load environment variables into process.env
dotenv.config();

// Create an Express router instance
const router = express.Router();

// Create a Groq client using API key from environment variables
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          
          role: "system",
          content:
            "You are a Global Tech University (GTU) Student Portal Assistant located in Kenya, Thika Town. Answer clearly and helpfully. Official email is GTU.ac.ke."
        },
        {
    
          role: "user",
          content: userMessage
        }
      ],

      max_completion_tokens: 300,

      temperature: 0.7
    });

    const botReply = completion.choices[0].message.content;

    return res.json({ reply: botReply });

  } catch (error) {
    console.error("Chatbot Error:", error);

    return res.status(500).json({
      reply: "Server is down. Please try again later."
    });
  }
});

export default router;
