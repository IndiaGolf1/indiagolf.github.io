// VirusGuard Functional Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight the current page in the navigation bar
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

// 2. Handle Contact Form Submission
function submitContact(event) {
  event.preventDefault();
  
  // Collect basic form data
  const name = document.getElementById('cName').value;
  const message = document.getElementById('cMsg').value;
  
  // Log for debugging and show success message
  console.log(`Message from ${name}: ${message}`);
  
  document.getElementById('contactForm').classList.add('d-none');
  document.getElementById('contactSuccess').classList.remove('d-none');
}
