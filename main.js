// main.js

// JavaScript Object to hold incident report data
class IncidentReport {
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.date = new Date().toLocaleDateString();
    }
}

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    // Get form elements
    const name = document.getElementById('userName').value;
    const type = document.getElementById('malwareType').value;
    const description = document.getElementById('description').value;

    // Instantiate the JS Object
    const newReport = new IncidentReport(name, type, description);

    // Save to Session Storage (Must stringify the object)
    sessionStorage.setItem('lastReport', JSON.stringify(newReport));

    // Display confirmation
    document.getElementById('formMessage').innerHTML = 
        `<div class="alert alert-success">Thank you, ${newReport.name}. Your report regarding a <strong>${newReport.type}</strong> has been saved to session storage.</div>`;
    
    // Clear the form
    document.getElementById('reportForm').reset();
}

// Function to check if a report exists in session storage on page load
function checkSessionStorage() {
    const savedData = sessionStorage.getItem('lastReport');
    if (savedData) {
        const report = JSON.parse(savedData);
        console.log("Previous report found in session storage:", report);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkSessionStorage();
    const form = document.getElementById('reportForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});