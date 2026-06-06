const BASE_URL = "https://aicareermentor-v7h5.onrender.com"

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
  return response.json()
}

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}
export const analyzeResume = async (resumeText) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}/resume/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ resume_text: resumeText })
  })
  return response.json()
}