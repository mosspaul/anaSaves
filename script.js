const GAME_AREA = document.querySelector(".gameArea > svg");

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

    if ((w * 0.375) <= posObj.x && posObj.x <= (w * 0.675)) {
        if ((h * 0.175) <= posObj.y && posObj.y <= (h * 0.525)) {
            goal = true;
        }
    }
    return goal;
}

GAME_AREA.addEventListener("click", pos => {
    let rect = GAME_AREA.getBoundingClientRect();
    console.log(checkGoal(rect, getPosition(pos)));

});

/* 
    width: 3/8 - [2/8] - 3/8
    height: 240 --- 7/40 - [10/40] - 23/40
*/