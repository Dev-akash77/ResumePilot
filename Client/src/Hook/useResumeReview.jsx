import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

//? 1. Import the API function directly (NOT the hook)
import { getPerticularResume } from "../Api/resumeApi"; 
import { getAtsPrompt } from "../utils/systemprompt";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const useGeminiAts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const analyzeResume = async (resumeId, jobRole) => {
    if (!resumeId || !jobRole) {
      toast.error("Please provide a Resume ID and Job Role");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // ----------------------------------------------
      // ! STEP 1: Fetch Resume Data using the API function
      // ----------------------------------------------
      const resumeContent = await getPerticularResume(resumeId);

  
      if (!resumeContent || Object.keys(resumeContent).length === 0) {
        throw new Error("Resume data not found or ID is invalid.");
      }

      // ----------------------------------------------
      // ! STEP 2: Call Google Gemini AI
      // ----------------------------------------------
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      
      const prompt = getAtsPrompt(jobRole, resumeContent);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // ----------------------------------------------
      // ! STEP 3: Clean & Parse JSON
      // ----------------------------------------------
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const jsonResult = JSON.parse(text);

      setData(jsonResult);
      toast.success("Analysis Complete!");

    } catch (err) {
      console.error("ATS Error:", err);
      const msg = err.message || "Failed to analyze resume.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, analyzeResume };
};