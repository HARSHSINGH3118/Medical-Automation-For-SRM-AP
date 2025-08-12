const API_URL = "http://localhost:5000/api";

// **Email Domain Check:** Ensure email ends with "srmap.edu.in"
function validateEmail(email) {
  return email.endsWith("srmap.edu.in");
}

async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

async function signup(email, password, role) {
  if (!validateEmail(email)) {
    return {
      success: false,
      message: "Email must be from srmap.edu.in domain",
    };
  }
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  return response.json();
}

export default { login, signup };
