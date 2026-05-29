import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const name = localStorage.getItem("name")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Welcome back, {name}!</h1>
            <p className="text-gray-400">Here is your career overview</p>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold transition">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-blue-400 font-semibold mb-2">Resume Score</h3>
            <p className="text-5xl font-bold text-white">85%</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-green-400 font-semibold mb-2">Skills Match</h3>
            <p className="text-5xl font-bold text-white">12</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-purple-400 font-semibold mb-2">Jobs Found</h3>
            <p className="text-5xl font-bold text-white">24</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div onClick={() => navigate("/resume")} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 cursor-pointer transition">
            <h3 className="text-white font-bold text-xl mb-2">Resume Analyzer</h3>
            <p className="text-gray-400">Upload your resume and get AI-powered feedback</p>
          </div>
          <div onClick={() => navigate("/roadmap")} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 cursor-pointer transition">
            <h3 className="text-white font-bold text-xl mb-2">Career Roadmap</h3>
            <p className="text-gray-400">Get a personalized career path based on your skills</p>
          </div>
          <div onClick={() => navigate("/interview")} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 cursor-pointer transition">
            <h3 className="text-white font-bold text-xl mb-2">Interview Prep</h3>
            <p className="text-gray-400">Practice with AI-generated interview questions</p>
          </div>
          <div onClick={() => navigate("/chat")} className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 cursor-pointer transition">
            <h3 className="text-white font-bold text-xl mb-2">AI Mentor Chat</h3>
            <p className="text-gray-400">Chat with your personal AI career mentor</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
