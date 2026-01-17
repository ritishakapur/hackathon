document.addEventListener("DOMContentLoaded", () => {

    // Utility: switch between screens
    function showScreen(screenId) {
        document.querySelectorAll(".container").forEach(container => {
            container.style.display = "none";
        });
        document.getElementById(screenId).style.display = "block";
    }

    // ----------------------------
    // STEP 2: Start Studying button
    // ----------------------------
    const startStudyingBtn = document.getElementById("startStudying");
    if (startStudyingBtn) {
        startStudyingBtn.addEventListener("click", () => {
            showScreen("brainDump");
        });
    }

    // ----------------------------
    // STEP 3: Task selection logic
    // ----------------------------
    const confirmTasksBtn = document.getElementById("confirmTasks");
    const selectedTaskText = document.getElementById("selectedTaskText");

    if (confirmTasksBtn) {
        confirmTasksBtn.addEventListener("click", () => {
            const checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
            const inputs = document.querySelectorAll("#taskList input[type='text']");

            let selectedTask = "";

            checkboxes.forEach((box, index) => {
                if (box.checked && inputs[index].value.trim() !== "") {
                    selectedTask = inputs[index].value;
                }
            });

            if (!selectedTask) {
                alert("please select one task to continue");
                return;
            }

            selectedTaskText.textContent = selectedTask;
            showScreen("taskConfirm");
        });
    }

    // ----------------------------
    // STEP 4: 5-minute timer
    // ----------------------------
    const startTimerBtn = document.getElementById("startTimer");
    const timerDisplay = document.getElementById("timer");

    if (startTimerBtn) {
        startTimerBtn.addEventListener("click", () => {
            showScreen("timerScreen");

            let timeLeft = 5 * 60; // seconds

            const timerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                timerDisplay.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

                timeLeft--;

                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    showScreen("completionScreen");
                }
            }, 1000);
        });
    }

    // ----------------------------
    // STEP 5: Completion screen
    // ----------------------------
    const goHomeBtn = document.getElementById("goHome");
    const goCapsuleBtn = document.getElementById("goCapsule");

    if (goHomeBtn) {
        goHomeBtn.addEventListener("click", () => {
            location.reload();
        });
    }

    if (goCapsuleBtn) {
        goCapsuleBtn.addEventListener("click", () => {
            alert("study capsule coming next 👀");
        });
    }

});
