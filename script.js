let interval;
let seconds = 0;
let isStopwatch = false;

const stopwatchBtn = document.getElementById("start-stopwatch");
const timerBtn = document.getElementById("start-timer");
const timerScreen = document.getElementById("timer-screen");
const timeDisplay = document.getElementById("time-display");
const modeTitle = document.getElementById("mode-title");
const endSessionBtn = document.getElementById("end-session");

if (stopwatchBtn && timerBtn) {
    stopwatchBtn.addEventListener("click", () => {
        isStopwatch = true;
        seconds = 0;
        startSession("stopwatch mode");
    });

    timerBtn.addEventListener("click", () => {
        const minutes = prompt("enter duration in minutes");
        if (!minutes) return;
        isStopwatch = false;
        seconds = minutes * 60;
        startSession("timer mode");
    });
}

function startSession(title) {
    document.querySelector(".button-group").style.display = "none";
    timerScreen.classList.remove("hidden");
    modeTitle.textContent = title;

    interval = setInterval(() => {
        if (!isStopwatch) {
            if (seconds <= 0) {
                endSession();
                return;
            }
            seconds--;
        } else {
            seconds++;
        }

        updateDisplay();
    }, 1000);
}

function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.textContent =
        `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function endSession() {
    clearInterval(interval);
    alert("session ended");
    location.reload();
}