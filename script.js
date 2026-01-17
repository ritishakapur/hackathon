let mode = null;
let intervalId = null;
let seconds = 0;

const modeSection = document.getElementById('mode-section');
const timerSection = document.getElementById('timer-section');
const timeDisplay = document.getElementById('time-display');
const modeTitle = document.getElementById('mode-title');
const arrowControls = document.getElementById('arrow-controls');

// Start Stopwatch
document.getElementById('start-stopwatch').addEventListener('click', () => {
    mode = 'stopwatch';
    seconds = 0;
    modeSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
    modeTitle.textContent = '⏱️ stopwatch';
    arrowControls.style.display = 'none';
    timeDisplay.value = '00:00';
    timeDisplay.readOnly = true;
    startStopwatch();
});

// Start Timer
document.getElementById('start-timer').addEventListener('click', () => {
    mode = 'timer';
    seconds = 0;
    modeSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
    modeTitle.textContent = '⏲️ timer';
    arrowControls.style.display = 'flex';
    timeDisplay.value = '00:00';
    timeDisplay.readOnly = false;
});

// Stopwatch Logic
function startStopwatch() {
    intervalId = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}

// Increase Time (Timer only)
document.getElementById('increase-time').addEventListener('click', () => {
    if (mode === 'timer') {
        seconds += 60;
        updateDisplay();
    }
});

// Decrease Time (Timer only)
document.getElementById('decrease-time').addEventListener('click', () => {
    if (mode === 'timer' && seconds >= 60) {
        seconds -= 60;
        updateDisplay();
    }
});

// Manual Edit for Timer
timeDisplay.addEventListener('blur', () => {
    if (mode === 'timer') {
        const value = timeDisplay.value;
        const parts = value.split(':');
        if (parts.length === 2) {
            const mins = parseInt(parts[0]) || 0;
            const secs = parseInt(parts[1]) || 0;
            seconds = mins * 60 + secs;
            updateDisplay();
        }
    }
});

// Update Display
function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// End Session
document.getElementById('end-session').addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    timerSection.classList.add('hidden');
    modeSection.classList.remove('hidden');
    mode = null;
    seconds = 0;
});