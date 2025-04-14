import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Your Gemini API key (use env variable in production)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy? and every time give diffrent answer not same'.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ completion: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        message: "Error generating suggestions",
        error: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
