const GAME_AREA = document.querySelector(".gameArea > svg");

function getPosition(e) {
    return {
        x: e.clientX, 
        y: e.clientY,
    }
}

GAME_AREA.addEventListener("click", pos => {
    console.table(getPosition(pos));
});