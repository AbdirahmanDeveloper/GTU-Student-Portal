const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5000/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message || 'Invalid username or password.';
      errorMsg.style.color = 'red';
      return;
    }

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.admin)
      );

     localStorage.setItem("loginTime", Date.now());

      localStorage
      
    window.location.href = "/frontend/admin/admin.html";
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.textContent = 'An error occurred. Please try again later.';
    errorMsg.style.color = 'red';
  }
});