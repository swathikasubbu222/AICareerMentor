import { useState } from "react"
import { useNavigate } from "react-router-dom"

function InterviewPrep() {
  const navigate = useNavigate()
  const [role, setRole] = useState("")
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!role.trim()) {
      setError("Please enter a job role!")
      return
    }
    setLoading(true)
    setError("")
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:8000/api/interview/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    })
    const data = await response.json()
    setLoading(false)
    if (data.questions) {
      setQuestions(data.questions)
    } else {
      setError("Failed to generate questions. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/dashboard")} className="text-gray-400 hover:text-white transition">
            Back
          </button>
          <h1 className="text-4xl font-bold text-white">Interview Prep</h1>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4 text-xl">What role are you preparing for?</h2>
          <input
            type="text"
            placeholder="e.g. Frontend Developer, Data Scientist, Python Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {error && <p className="text-red-400 mb-2">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Generating questions..." : "Generate Interview Questions"}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white font-bold text-2xl mb-4">Your Interview Questions</h2>
            {questions.map((q, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-6">
                <div className="flex gap-4">
                  <span className="text-blue-400 font-bold text-xl">{i + 1}.</span>
                  <div>
                    <p className="text-white font-semibold mb-2">{q.question}</p>
                    <p className="text-gray-400 text-sm">{q.tip}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setQuestions([])}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Generate New Questions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewPrep