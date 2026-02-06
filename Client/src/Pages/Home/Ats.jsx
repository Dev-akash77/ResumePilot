import React, { useState } from "react";
import { 
  LuSearch, 
  LuCircleCheck,   // UPDATED: Was LuCheckCircle
  LuTriangleAlert, // UPDATED: Was LuAlertTriangle
  LuCircleX,       // UPDATED: Was LuXCircle
  LuChartBar,      // UPDATED: Was LuBarChart
  LuSparkles,
  LuFileText,
  LuBriefcase
} from "react-icons/lu";

const Ats = () => {
  // Local state for inputs
  const [resumeId, setResumeId] = useState("");
  const [jobRole, setJobRole] = useState("");
  
  // State for handling analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // ! Function to handle the review process (Mocking the API call)
  const handleAnalyze = () => {
    if (!resumeId || !jobRole) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate API delay (Replace this with your actual Redux action / API call)
    setTimeout(() => {
      setAnalysisResult(mockAnalysisData); // Setting mock data for UI demo
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="md:w-full max-w-screen min-h-screen bg-gray-50/30 pb-20 pt-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto h-full">
        
        {/* 1. Header Section */}
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            AI Resume Reviewer <LuSparkles className="text-blue-500" size={24}/>
          </h2>
          <p className="text-gray-500 text-lg">
            Get a detailed ATS breakdown and scoring based on your target job role.
          </p>
        </div>

        {/* 2. Input Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            
            {/* Resume ID Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Resume ID</label>
              <div className="relative">
                <LuFileText className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Paste Resume ID here..." 
                  value={resumeId}
                  onChange={(e) => setResumeId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Target Job Role Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Target Job Role</label>
              <div className="relative">
                <LuBriefcase className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Backend Developer" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeId || !jobRole}
              className={`py-2.5 px-6 rounded-xl font-semibold text-white transition-all shadow-md flex items-center justify-center gap-2
                ${isAnalyzing || !resumeId || !jobRole 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95"}`}
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <><LuSearch size={18}/> Review Resume</>
              )}
            </button>

          </div>
        </div>

        {/* 3. Analysis Results Section */}
        {isAnalyzing && <AnalysisSkeleton />}
        
        {!isAnalyzing && analysisResult && (
          <div className="animate-fade-in-up">
            
            {/* Top Row: Score Card & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              
              {/* Score Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                <h3 className="text-gray-500 font-medium mb-4">Overall ATS Score</h3>
                
                {/* Score Circle UI */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                     <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={351} 
                        strokeDashoffset={351 - (351 * analysisResult.score) / 100} 
                        className={`${getScoreColor(analysisResult.score)} transition-all duration-1000 ease-out`} 
                     />
                   </svg>
                   <span className={`absolute text-4xl font-bold ${getScoreTextColor(analysisResult.score)}`}>
                     {analysisResult.score}
                   </span>
                </div>
                
                <p className="text-sm text-center text-gray-500">
                  Your resume is <span className="font-bold text-gray-800">{getScoreLabel(analysisResult.score)}</span> for a {jobRole} role.
                </p>
              </div>

              {/* Breakdown Bars */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                  <LuChartBar className="text-blue-500"/> {/* UPDATED: LuChartBar */}
                  Performance Breakdown
                </h3>
                <div className="space-y-6">
                  <ProgressBar label="Keywords & Skills" score={analysisResult.breakdown.keywords} />
                  <ProgressBar label="Formatting & Structure" score={analysisResult.breakdown.formatting} />
                  <ProgressBar label="Impact & Metrics" score={analysisResult.breakdown.impact} />
                  <ProgressBar label="Job Relevance" score={analysisResult.breakdown.relevance} />
                </div>
              </div>

            </div>

            {/* Bottom Row: Detailed Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Strengths */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 border-l-4 border-l-green-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                    <LuCircleCheck size={18}/> {/* UPDATED: LuCircleCheck */}
                  </div>
                  What you did well
                </h3>
                <ul className="space-y-3">
                  {analysisResult.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                       <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                       {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 border-l-4 border-l-red-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-full text-red-600">
                    <LuTriangleAlert size={18}/> {/* UPDATED: LuTriangleAlert */}
                  </div>
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysisResult.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                       <LuCircleX className="text-red-500 mt-0.5 flex-shrink-0" size={16}/> {/* UPDATED: LuCircleX */}
                       {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

// --- Helper Components ---

const ProgressBar = ({ label, score }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-500">{score}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full transition-all duration-1000 ${getScoreColor(score)}`} 
        style={{ width: `${score}%` }}
      ></div>
    </div>
  </div>
);

const AnalysisSkeleton = () => (
  <div className="animate-pulse space-y-8">
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
        <div className="h-64 lg:col-span-2 bg-gray-200 rounded-2xl"></div>
     </div>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-48 bg-gray-200 rounded-2xl"></div>
        <div className="h-48 bg-gray-200 rounded-2xl"></div>
     </div>
  </div>
);

// --- Utilities ---
const getScoreColor = (score) => {
  if (score >= 80) return "text-green-500 bg-green-500";
  if (score >= 50) return "text-yellow-500 bg-yellow-500";
  return "text-red-500 bg-red-500";
};

const getScoreTextColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
};

const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Work";
};

// --- Mock Data (To be replaced with Backend Response) ---
const mockAnalysisData = {
  score: 80,
  breakdown: {
    keywords: 85,
    formatting: 90,
    impact: 60,
    relevance: 65
  },
  strengths: [
    "Contact information is clear and professional.",
    "Section headers are standard and easily parsable by ATS.",
    "Good use of action verbs (e.g., Developed, Orchestrated).",
    "Technical skills section is well categorized."
  ],
  weaknesses: [
    "Missing key terms related to 'Backend Systems' found in typical job descriptions.",
    "Experience bullets lack quantifiable metrics (e.g., 'Improved performance by 20%').",
    "Summary is too generic; needs to be tailored to the job role.",
    "Found 2 potential spelling errors in the 'Project' section."
  ]
};

export default Ats;