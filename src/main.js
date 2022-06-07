"use strict";

import PopUp from "./popUp.js";
import { Reason, GameBuilder } from "./game.js";

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
    case Reason.cancel:
      message = "Replay❓";
      break;
    case Reason.win:
      message = "YOU WON🙌";
      break;
    case Reason.lose:
      message = "YOU LOSE☠️";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});
