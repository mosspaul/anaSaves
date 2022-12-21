const GAME_AREA = document.querySelector(".gameArea > .field");

function getPosition(e) {
    return {
        x: e.clientX, 
        y: e.clientY,
    }
}

function checkGoal(rect, posObj) {
    h = rect.height + 100;
    w = rect.width + 100;
    let goal = false;

    if ((w * 0.46) <= posObj.x && posObj.x <= (w * 0.675)) {
        if ((h * 0.325) <= posObj.y && posObj.y <= (h * 0.525)) {
            goal = true;
        }
    }
    return goal;
}

GAME_AREA.addEventListener("click", pos => {
    let rect = GAME_AREA.getBoundingClientRect();
    let goal = checkGoal(rect, getPosition(pos));
    console.log(`${goal ? "Goal" : "Missed"}`);
});
