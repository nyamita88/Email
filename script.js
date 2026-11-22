
const API = "https://email-08.onrender.com";//Replace with your server URL
let timerInterval = null;
let timerSeconds = 0;

function startTimer(duration) {
  clearInterval(timerInterval);
  timerSeconds = duration;
  const timerDisplay = document.getElementById("timer");
  const sendBtn = document.getElementById("sendCodeBtn");
  sendBtn.disabled = true;
  timerDisplay.style.display = "block";
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "You can resend the code.";
      sendBtn.disabled = false;
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  if (timerSeconds > 0) {
    timerDisplay.innerHTML = `<span style='font-size:1.2em;letter-spacing:2px;'>⏳ ${timerSeconds}s</span>`;
  }
}

function sendCode() {
  const email = document.getElementById("email").value;
  fetch(`${API}/send-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("message").innerText = data.message;
    startTimer(30);
  })
  .catch(err => {
    document.getElementById("message").innerText = "Error sending code";
  });
}

function verifyCode() {
  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;

  fetch(`${API}/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("message").innerText = data.message;
  })
  .catch(err => {
    document.getElementById("message").innerText = "Verification failed";
  });
}
