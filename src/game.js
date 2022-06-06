"use strict";

export default class Game {
  constructor(carrotCount, score, durationSec, timer) {
    this.carrotCount = carrotCount;
    this.score = score;
    this.durationSec = durationSec;
    this.timer = timer;
    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
    });
  }

  // setEventListener

  setEventListener(onClick) {
    this.onClick = onClick;
  }

  // timer
  startGameTimer() {
    let remainingTimeSec = this.durationSec; // 전역변수를 지역변수에 담는 이유 > const변수를 let변수로 사용하기 위해
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 1) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText = (time) => {
    const minutes = Math.floor(time / 60); // 5/60 = 0.0분, 65/60 = 1.0분 단위로 나누기
    const seconds = time % 60; // 65/60의 나머지 값 = 5초
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  };

  // show button
  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  // hide button
  hideStartButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  // score
  updateScoreBoard() {
    console.log(this.score);
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  resetGameScore() {
    this.gameScore.innerText = this.carrotCount;
  }

  //finish
  finish = (finishGame) => {
    this.finish = finishGame;
  };
}
