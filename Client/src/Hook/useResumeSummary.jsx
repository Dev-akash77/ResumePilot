import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSummaryPrompt } from "../utils/systemprompt";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const useResumeSummary = () => {
  const [loading, setLoading] = useState(false);

  const generateSummary = async (jobRole) => {
    try {
      setLoading(true);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
      });

      const result = await model.generateContent(getSummaryPrompt(jobRole));
      const response = await result.response;

      return response.text();

    } catch (error) {
      console.error(error);
      return "";
    } finally {
      setLoading(false);
    }
  };

  return { generateSummary, loading };
};

export default useResumeSummary;