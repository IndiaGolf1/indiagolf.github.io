// VirusGuard shared JavaScript

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

// ---- Quiz logic (used on quiz.html) ----
const quizData = {
  title: "Computer Virus Knowledge Check",
  questions: [
    { id: 1, question: "Which type of malware encrypts your files and demands payment?",
      options: ["Adware", "Ransomware", "Spyware", "Worm"], answer: "Ransomware" },
    { id: 2, question: "What was the first PC virus?",
      options: ["Creeper", "Brain", "Melissa", "Stuxnet"], answer: "Brain" },
    { id: 3, question: "Which of the following is the BEST defense against ransomware?",
      options: ["Stronger passwords", "Regular backups", "Faster internet", "More RAM"], answer: "Regular backups" },
    { id: 4, question: "A Trojan Horse is malware that:",
      options: ["Self-replicates over networks","Disguises itself as legitimate software","Infects boot sectors","Displays unwanted ads"],
      answer: "Disguises itself as legitimate software" },
    { id: 5, question: "Which of these is NOT a common infection vector?",
      options: ["Email attachments","USB drives","Reading a printed book","Malicious websites"], answer: "Reading a printed book" }
  ]
};
const STORAGE_KEY = 'virusguard_quiz_state';

function renderQuiz() {
  const container = document.getElementById('quizQuestions');
  if (!container) return;
  document.getElementById('quizTitle').textContent = quizData.title;

  const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  document.getElementById('quizName').value = saved.name || '';
  const answers = saved.answers || {};

  container.innerHTML = quizData.questions.map((q, idx) => `
    <div class="card mb-3 shadow-sm">
      <div class="card-body">
        <h3 class="h6">${idx + 1}. ${q.question}</h3>
        ${q.options.map(opt => `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="q${q.id}" id="q${q.id}_${opt}" value="${opt}" ${answers[q.id] === opt ? 'checked' : ''}>
            <label class="form-check-label" for="q${q.id}_${opt}">${opt}</label>
          </div>`).join('')}
      </div>
    </div>`).join('');

  renderHistory(saved.history || []);
}

function renderHistory(history) {
  const wrap = document.getElementById('quizHistoryWrap');
  if (!wrap) return;
  if (!history.length) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = `
    <h2 class="h5 mt-5">Recent Attempts (this session)</h2>
    <table class="table table-sm">
      <thead><tr><th>Name</th><th>Score</th><th>When</th></tr></thead>
      <tbody>
        ${history.map(h => `<tr><td>${h.name}</td><td>${h.score} / ${h.total}</td><td class="text-muted small">${h.date}</td></tr>`).join('')}
      </tbody>
    </table>`;
}

function submitQuiz(e) {
  e.preventDefault();
  const name = document.getElementById('quizName').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  const answers = {};
  let correct = 0;
  quizData.questions.forEach(q => {
    const sel = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (sel) {
      answers[q.id] = sel.value;
      if (sel.value === q.answer) correct++;
    }
  });
  const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  const history = [{ name, score: correct, total: quizData.questions.length, date: new Date().toLocaleString() },
    ...(saved.history || [])].slice(0, 5);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ name, answers, score: correct, history }));

  document.getElementById('quizResult').innerHTML = `
    <div class="alert ${correct === quizData.questions.length ? 'alert-success' : 'alert-info'} mt-4">
      <h4 class="alert-heading">Result for ${name}</h4>
      <p class="mb-0">You scored <strong>${correct}</strong> out of <strong>${quizData.questions.length}</strong>.</p>
    </div>`;
  renderHistory(history);
}

function clearQuiz() {
  sessionStorage.removeItem(STORAGE_KEY);
  document.getElementById('quizName').value = '';
  document.getElementById('quizResult').innerHTML = '';
  renderQuiz();
}

// ---- Contact form (contact.html) ----
function submitContact(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('cName').value,
    email: document.getElementById('cEmail').value,
    topic: document.getElementById('cTopic').value,
    severity: document.querySelector('input[name="severity"]:checked')?.value,
    message: document.getElementById('cMsg').value,
    subscribe: document.getElementById('cSub').checked
  };
  console.log('Contact submission:', data);
  document.getElementById('contactForm').classList.add('d-none');
  document.getElementById('contactSuccess').classList.remove('d-none');
}
