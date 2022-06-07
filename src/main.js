"use strict";

import PopUp from "./popUp.js";
import GameBuilder from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder()
  .carrotCount(5) //
  .bugCount(5) //
  .gameDuration(5) //
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay❓";
      break;
    case "win":
      message = "YOU WON🙌";
      break;
    case "lose":
      message = "YOU LOSE☠️";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
