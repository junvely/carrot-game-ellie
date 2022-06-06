"use strict";

import PopUp from "./popUp.js";
import Field from "./field.js";
import * as sound from "./sound.js";
import Game from "./game.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

export let started = false;
let score = 0;
let timer = undefined; // let timer; 와 같음

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

const game = new Game(CARROT_COUNT, score, GAME_DURATION_SEC, timer);
game.setEventListener(() => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

game.finish(finishGame);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    game.score++;
    game.updateScoreBoard();
    if (game.score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

function startGame() {
  started = true;
  initGame();
  game.showStopButton();
  game.showTimerAndScore();
  game.startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  game.stopGameTimer();
  game.hideStartButton();
  gameFinishBanner.showWithText("REPLAY❓");
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  game.hideStartButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  game.stopGameTimer();
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? "YOU WON🙌" : "YOU LOST☠️");
}

function initGame() {
  game.score = 0;
  game.resetGameScore();
  gameField.init();
}

initGame();
