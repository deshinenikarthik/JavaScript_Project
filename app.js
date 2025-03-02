let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");

let gameSt = false;
let level = 0;

let gameSeq = [];
let userSeq = [];

let highScore = 0;
document.addEventListener("keypress", function () {
    if (gameSt == false) {
        gameSt = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!.Your score was <b>${level}</b>.<br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        if (highScore < level) {
            highScore = level;
        }
        let h3 = document.querySelector("h3");
        h3.innerText = `Your HighScore is: ${highScore}`;
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(this);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    gameSt = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}