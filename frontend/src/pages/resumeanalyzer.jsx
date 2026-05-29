import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { analyzeResume } from "../services/api"

function ResumeAnalyzer() {
  const navigate = useNavigate()
  const [resumeText, setResumeText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text first!")
      return
    }
    setLoading(true)
    setError("")
    const data = await analyzeResume(resumeText)
    setLoading(false)
    if (data.score !== undefined) {
      setResult(data)
    } else {
      setError("Analysis failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-white">📄 Resume Analyzer</h1>
        </div>

        {/* Input */}
        {!result && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4 text-xl">
              Paste your resume below:
            </h2>
            <textarea
              rows={12}
              placeholder="Paste your full resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {error && (
              <p className="text-red-400 mt-2">{error}</p>
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50 w-full"
            >
              {loading ? "🤖 AI is analyzing your resume..." : "Analyze My Resume"}
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">

            {/* Score */}
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <h2 className="text-gray-400 mb-2">Resume Score</h2>
              <p className={`text-8xl font-bold ${
                result.score >= 70 ? "text-green-400" :
                result.score >= 50 ? "text-yellow-400" : "text-red-400"
              }`}>
                {result.score}%
              </p>
              <p className="text-gray-300 mt-4">{result.summary}</p>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-green-400 font-bold text-xl mb-4">✅ Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-yellow-400 font-bold text-xl mb-4">⚠️ Improvements</h3>
                <ul className="space-y-2">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Missing Skills & Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-red-400 font-bold text-xl mb-4">❌ Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map((s, i) => (
                    <span key={i} className="bg-red-950 text-red-300 px-3 py-1 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-blue-400 font-bold text-xl mb-4">🎯 Recommended Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {result.recommended_roles.map((s, i) => (
                    <span key={i} className="bg-blue-950 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Analyze Again */}
            <button
              onClick={() => setResult(null)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Analyze Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalyzer