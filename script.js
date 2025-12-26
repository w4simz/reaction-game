const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");
const best = document.getElementById("best");

let startTime;
let timeout;
let waiting = false;

let bestTime = localStorage.getItem("bestTime");
if (bestTime) best.innerText = `Best: ${bestTime} ms`;

startBtn.onclick = () => {
    resetGame();
    message.innerText = "Wait for green...";
    game.classList.add("wait");
    waiting = true;

    timeout = setTimeout(() => {
        game.classList.remove("wait");
        game.classList.add("ready");
        message.innerText = "TAP NOW!";
        startTime = Date.now();
        waiting = false;
        navigator.vibrate?.(100);
    }, Math.random() * 3000 + 2000);
};

game.onclick = () => {
    if (waiting) {
        clearTimeout(timeout);
        message.innerText = "Too early 😅";
        game.classList.remove("wait");
        return;
    }

    if (game.classList.contains("ready")) {
        const reaction = Date.now() - startTime;
        result.innerText = `Your Time: ${reaction} ms`;

        if (!bestTime || reaction < bestTime) {
            bestTime = reaction;
            localStorage.setItem("bestTime", bestTime);
            best.innerText = `Best: ${bestTime} ms`;
        }

        navigator.vibrate?.(50);
        game.classList.remove("ready");
        message.innerText = "Click Start to try again";
    }
};

function resetGame() {
    clearTimeout(timeout);
    result.innerText = "";
    game.classList.remove("wait", "ready");
}