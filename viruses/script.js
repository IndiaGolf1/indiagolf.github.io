// Welcome popup

function welcomeMessage() {

    alert(
        "Welcome to CyberShield Intelligence"
    );
}

// Cybersecurity object

const malware = {

    name: "Ransomware",

    dangerLevel: "Critical",

    target: "Personal Files",

    discovered: 1989,

    examples: [
        "WannaCry",
        "Ryuk",
        "LockBit"
    ]
};

console.log(malware);

// Session storage

function saveUserPreference() {

    let username =
        document.getElementById("username").value;

    let interest =
        document.getElementById("interest").value;

    sessionStorage.setItem(
        "visitorName",
        username
    );

    sessionStorage.setItem(
        "cyberInterest",
        interest
    );

    document.getElementById("output")
        .innerHTML =

        "Welcome back, " +
        sessionStorage.getItem("visitorName") +

        ". Your selected topic is " +

        sessionStorage.getItem("cyberInterest");
}

// Dynamic threat level

function calculateThreat() {

    let level =
        Math.floor(Math.random() * 100);

    document.getElementById("threatLevel")
        .innerHTML =

        "Current simulated threat level: "
        + level + "%";
}