import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const systemPrompt = `
You are a flashcard creator. Your task is to generate flashcards designed for effective learning and retention. Each flashcard should be clear, concise, and focused on a single concept or question.

Flashcard Format:
Front of the Flashcard: Present a question, term, or concept. Ensure it is direct and encourages active recall. Avoid excessive wording or complex sentence structures.
Back of the Flashcard: Provide a clear, concise answer or explanation. Include key details or examples that reinforce understanding. Where applicable, break down information into bullet points for clarity.

Guidelines:
Brevity: Keep information short and to the point. Use simple language.
Focus: Each card should cover only one idea or question.
Clarity: Avoid ambiguity. The information should be easily understandable.
Active Learning: Design questions that promote active recall rather than recognition.
Relevance: Tailor content to the specific subject matter and learning objectives.
Visuals (if applicable): Use diagrams or images on flashcards where they aid in understanding.

Example:
Front: What is the capital of France? 
Back: Paris 
Front: Explain the concept of osmosis. 
Back: Osmosis is the movement of water molecules across a semipermeable membrane. Water moves from a region of lower solute concentration to a region of higher solute concentration.

DO NOT GENERATE ANY LINES BEFORE THE JSON RESPONSE.
Only generate 10 flashcards.
Return in the following JSON format but replace the text with relevant information relating to the users input: 
Raw Response: [
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    },
    {
        "front": "",
        "back": ""
    }
]`;

export async function POST(request) {
    try {
        const { text } = await request.json();
        const chatCompletion = await getGroqChatCompletion(text);

        // Debugging: Log the raw response content
        console.log("Raw Response:", chatCompletion.choices[0]?.message?.content);

        // Try to parse the response as JSON
        let flashcards;
        try {
            flashcards = JSON.parse(chatCompletion.choices[0]?.message?.content);
        } catch (parseError) {
            console.error("Failed to parse JSON:", parseError);
            return NextResponse.json({ error: "Failed to generate flashcards: invalid JSON response" }, { status: 500 });
        }

        return NextResponse.json(flashcards);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}

async function getGroqChatCompletion(text) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `${systemPrompt}\n\nInput: ${text}`,
            },
        ],
        model: "llama3-8b-8192",
    });
}
