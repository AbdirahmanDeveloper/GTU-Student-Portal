const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const reg_number = document.getElementById('username').value.trim();
  const phone_number = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5000/api/student-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reg_number, phone_number })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message || 'Invalid registration number or password.';
      errorMsg.style.color = 'red';
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(data.student));
    localStorage.setItem("loginTime", Date.now());
    window.location.href = "/frontend/student/index.html";
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.textContent = 'An error occurred. Please try again later.';
    errorMsg.style.color = 'red';
  }
});
