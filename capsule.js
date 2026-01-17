let mode = null;
let intervalId = null;
let seconds = 0;
let isRunning = false;

const modeSection = document.getElementById('mode-section');
const timerSection = document.getElementById('timer-section');
const timeDisplay = document.getElementById('time-display');
const modeTitle = document.getElementById('mode-title');
const arrowControls = document.getElementById('arrow-controls');
const startPauseBtn = document.getElementById('start-pause');

document.getElementById('start-stopwatch').addEventListener('click', () => {
    mode = 'stopwatch';
    seconds = 0;
    isRunning = true;
    modeSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
    modeTitle.textContent = '⏱️ stopwatch';
    arrowControls.style.display = 'none';
    startPauseBtn.style.display = 'none';
    timeDisplay.value = '00:00';
    timeDisplay.readOnly = true;
    startStopwatch();
});

document.getElementById('start-timer').addEventListener('click', () => {
    mode = 'timer';
    seconds = 0;
    isRunning = false;
    modeSection.classList.add('hidden');
    timerSection.classList.remove('hidden');
    modeTitle.textContent = '⏲️ timer';
    arrowControls.style.display = 'flex';
    startPauseBtn.style.display = 'block';
    startPauseBtn.textContent = 'start session';
    timeDisplay.value = '00:00';
    timeDisplay.readOnly = false;
});


function startStopwatch() {
    intervalId = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}


function startTimer() {
    intervalId = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            updateDisplay();
        } else {

            clearInterval(intervalId);
            intervalId = null;
            isRunning = false;
            startPauseBtn.textContent = 'start session';
        }
    }, 1000);
}


startPauseBtn.addEventListener('click', () => {
    if (mode === 'timer') {
        if (!isRunning) {

            if (seconds === 0) {
                alert('Please set a time first!');
                return;
            }
            isRunning = true;
            timeDisplay.readOnly = true;
            arrowControls.style.display = 'none';
            startPauseBtn.textContent = 'pause';
            startTimer();
        } else {

            isRunning = false;
            clearInterval(intervalId);
            intervalId = null;
            timeDisplay.readOnly = false;
            arrowControls.style.display = 'flex';
            startPauseBtn.textContent = 'resume';
        }
    }
});


document.getElementById('increase-time').addEventListener('click', () => {
    if (mode === 'timer' && !isRunning) {
        seconds += 60;
        updateDisplay();
    }
});


document.getElementById('decrease-time').addEventListener('click', () => {
    if (mode === 'timer' && !isRunning && seconds >= 60) {
        seconds -= 60;
        updateDisplay();
    }
});


timeDisplay.addEventListener('blur', () => {
    if (mode === 'timer' && !isRunning) {
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


function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeDisplay.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


document.getElementById('end-session').addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    timerSection.classList.add('hidden');
    modeSection.classList.remove('hidden');
    mode = null;
    seconds = 0;
    isRunning = false;
});