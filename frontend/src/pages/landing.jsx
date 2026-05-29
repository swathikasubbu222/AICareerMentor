import { useNavigate } from "react-router-dom"

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-white mb-4">
          AI Career Mentor
        </h1>
        <p className="text-gray-400 text-xl mb-8 max-w-xl mx-auto">
          Your personal AI-powered guide for resumes, skills, and career growth
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing