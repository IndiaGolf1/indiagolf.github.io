// JavaScript Object Constructor
function MalwareIncident(name, type, desc) {
    this.name = name;
    this.type = type;
    this.desc = desc;
    this.timestamp = new Date().toLocaleString();
}

document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const incident = new MalwareIncident(
                document.getElementById('userName').value,
                document.getElementById('malwareType').value,
                document.getElementById('description').value
            );
            // Session Storage
            sessionStorage.setItem('activeIncident', JSON.stringify(incident));
            renderSessionData();
            reportForm.reset();
        });
    }
    renderSessionData();
});

function renderSessionData() {
    const display = document.getElementById('sessionDisplay');
    if (!display) return;
    const data = JSON.parse(sessionStorage.getItem('activeIncident'));
    if (data) {
        display.innerHTML = `
            <div class="alert alert-danger shadow-sm">
                <h6>Recent Local Report:</h6>
                <p class="mb-1"><strong>${data.name}</strong> reported a <strong>${data.type}</strong></p>
                <small class="text-muted">${data.timestamp}</small>
            </div>`;
    }
}