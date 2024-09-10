import { GoogleGenerativeAI } from "@google/generative-ai";

// Accessing API key
const API_KEY = "AIzaSyCWZeqagyy4RR3-K4xjpqehZaT5QyoBgss";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function runPrompt(inputs) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Recommend 10 books (Book name and its author only) that align with these preferences of a reader. The reader is aged ${inputs[0].value} and has a keen interest in ${inputs[1].value}. Their favorite genre is ${inputs[2].value}, and they have a particular fondness for the works of ${inputs[3].value} author/s. They prefer ${inputs[4].value} format of books of ${inputs[5].value} length and aim to read for ${inputs[6].value} purpose. Additionally, they prefer books in ${inputs[7].value} language. Add book names in quotes.`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}