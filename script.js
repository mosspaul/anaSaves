const GAME_AREA = document.querySelector(".gameArea");
const ANA = document.querySelector(".ana");
const BALL = document.querySelector(".ball");
const TEXT = document.querySelector(".text");

function getPosition(e) {
    return {
        x: e.clientX,
        y: e.clientY,
    }
}

function checkGoal(rect, posObj) {
    // checks if the clicked area is in the goal
    h = rect.height;
    w = rect.width;
    let goal = false;

    if ((w * 0.33) <= posObj.x && posObj.x <= (w * 0.625)) {
        if ((h * 0.325) <= posObj.y && posObj.y <= (h * 0.54)) {
            goal = true;
        }
    }
    return goal;
}
// Animation functions
function moveAna(deg, x, y) {
    ANA.style.transform = `translate(${x / 4}, ${y / 4}) rotate(${deg})`;
    setTimeout(secondmove, 250);
    function secondmove() { ANA.style.transform = `translate(${x / 3}, ${y / 3}) rotate(${deg})`; }
    setTimeout(thirdmove, 250);
    function thirdmove() { ANA.style.transform = `translate(${x / 2}, ${y / 2}) rotate(${deg})`; }
    setTimeout(finalmove, 250);
    function finalmove() { ANA.style.transform = `translate(${x}, ${y}) rotate(${deg})`; }
    let box = ANA.getBoundingClientRect();
    return {
        x: ((box.right + box.left) / 2),
        y: ((box.top + box.bottom) / 2),
    }
}

function moveBall(target, rect) {
    BALL.style.top = `${25 * ((target.y / rect.height) - 0.73)}%`;
    BALL.style.left = `${25 * ((target.x / rect.width) - 0.5)}%`;
    setTimeout(secondmove, 250);
    function secondmove() {
        BALL.style.top = `${50 * ((target.y / rect.height) - 0.73)}%`;
        BALL.style.left = `${50 * ((target.x / rect.width) - 0.5)}%`;
    }
    setTimeout(thirdmove, 250);
    function thirdmove() {
        BALL.style.top = `${75 * ((target.y / rect.height) - 0.73)}%`;
        BALL.style.left = `${75 * ((target.x / rect.width) - 0.5)}%`;
    }
    setTimeout(finalmove, 250);
    function finalmove() {
        BALL.style.top = `${100 * ((target.y / rect.height) - 0.73)}%`;
        BALL.style.left = `${100 * ((target.x / rect.width) - 0.5)}%`;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
let i = 0;

GAME_AREA.addEventListener("click", play);

function play(pos) {
    if (i >= 4) {
        GAME_AREA.removeEventListener("click", play);
    }
    let center = moveAna(`${getRandomInt(-60, 60)}deg`, `${getRandomInt(-10, 10)}vw`, `${getRandomInt(0, -4)}vw`);
    let rect = GAME_AREA.getBoundingClientRect();
    let target = getPosition(pos);
    let text = "";
    moveBall(target, rect);
    let goal = checkGoal(rect, target);
    if (goal) {
        if (target.x * 1.2 > center.x && target.x * -1.2 < center.x) {
            if (target.y * 1.3 > center.y && target.y * -1.3 < center.y) {
                text = "BLOCKED\n";
            }
            else {
                text = "GOAL\n";
            }
        }
        else {
            text = "GOAL\n";
        }
    }
    else {
        text = "MISSED\n";
    }
    setTimeout(reset, 3000);
    function reset() {
        moveAna("0deg", "0vw", "0vw");
        BALL.style.top = "33%";
        BALL.style.left = "0%";
        TEXT.textContent = "";
    }
    setTimeout(printOut, 1000);
    function printOut() {
        TEXT.textContent = text;
    }
    i++;
}