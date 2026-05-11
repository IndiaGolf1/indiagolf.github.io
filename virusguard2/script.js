// VirusGuard shared JavaScript

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});

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
