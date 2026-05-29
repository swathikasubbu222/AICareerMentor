import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AIMentorChat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I am your AI Career Mentor. Ask me anything about your career, resume, skills, or interview preparation!" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const token = localStorage.getItem("token")
    const history = newMessages.slice(1).map(m => ({ role: m.role, content: m.content }))

    const response = await fetch("http://localhost:8000/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ message: input, history })
    })
    const data = await response.json()
    setLoading(false)
    if (data.reply) {
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="p-6 border-b border-gray-800 flex items-center gap-4">
        <button onClick={() => navigate("/dashboard")} className="text-gray-400 hover:text-white transition">
          Back
        </button>
        <h1 className="text-2xl font-bold text-white">AI Mentor Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
              m.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-100"
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-2xl">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800">
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Ask your AI mentor anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIMentorChat