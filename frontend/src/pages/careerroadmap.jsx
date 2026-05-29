import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CareerRoadmap() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ current_skills: "", target_role: "" })
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!form.current_skills || !form.target_role) {
      setError("Please fill in both fields!")
      return
    }
    setLoading(true)
    setError("")
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:8000/api/roadmap/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
    const data = await response.json()
    setLoading(false)
    if (data.steps) {
      setRoadmap(data)
    } else {
      setError("Failed to generate roadmap. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/dashboard")} className="text-gray-400 hover:text-white transition">
            Back
          </button>
          <h1 className="text-4xl font-bold text-white">Career Roadmap</h1>
        </div>

        {!roadmap && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-white font-semibold mb-2 block">Your Current Skills:</label>
                <input
                  type="text"
                  placeholder="e.g. Python, HTML, CSS, MySQL"
                  value={form.current_skills}
                  onChange={(e) => setForm({...form, current_skills: e.target.value})}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-white font-semibold mb-2 block">Target Role:</label>
                <input
                  type="text"
                  placeholder="e.g. Full Stack Developer, Data Scientist"
                  value={form.target_role}
                  onChange={(e) => setForm({...form, target_role: e.target.value})}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-red-400">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {loading ? "Generating your roadmap..." : "Generate Career Roadmap"}
              </button>
            </div>
          </div>
        )}

        {roadmap && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{roadmap.target_role}</h2>
              <p className="text-blue-400 text-xl">Estimated time: {roadmap.estimated_time}</p>
            </div>

            <div className="space-y-4">
              {roadmap.steps.map((step, i) => (
                <div key={i} className="bg-gray-900 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-bold text-xl">{step.title}</h3>
                        <span className="text-gray-400 text-sm">{step.duration}</span>
                      </div>
                      <p className="text-gray-400 mb-3">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, j) => (
                          <span key={j} className="bg-blue-950 text-blue-300 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xl mb-4">Recommended Resources</h3>
              <ul className="space-y-2">
                {roadmap.resources.map((r, i) => (
                  <li key={i} className="text-gray-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setRoadmap(null)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Generate New Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerRoadmap