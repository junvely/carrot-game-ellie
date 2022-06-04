"use strict";

import PopUp from "./popUp.js";
import Field from "./field.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined; // let timer; 와 같음

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

function finishGame(win) {
  started = false;
  hideStartButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? "YOU WON🙌" : "YOU LOST☠️");
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideStartButton();
  gameFinishBanner.showWithText("REPLAY❓");
  playSound(alertSound);
  stopSound(bgSound);
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideStartButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC; // 전역변수를 지역변수에 담는 이유 > const변수를 let변수로 사용하기 위해
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 1) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60); // 5/60 = 0.0분, 65/60 = 1.0분 단위로 나누기
  const seconds = time % 60; // 65/60의 나머지 값 = 5초
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  console.log("score");
  gameScore.innerText = CARROT_COUNT - score;
}

function removeItem(e) {
  const carrot = e.target;
  const target = document.querySelector("img.carrot");
  if (carrot) {
    target.remove();
  }
}

initGame();
