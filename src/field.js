"use strict";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount, started) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.started = started;

    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.onClick = this.onClick.bind(this);
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (!this.started) {
      return;
    }
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.score++;
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };

  init() {
    this.field.innerHTML = "";
    this._addItem(ItemType.carrot, this.carrotCount, "img/carrot.png");
    this._addItem(ItemType.bug, this.bugCount, "img/bug.png");
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
}

// 클래스와 상관없는 함수들, 전체에서 사용하는 함수들은
//밖에다 두면 클래스 안에 없기 때문에 오브젝트에 만들어지지않아서 효율적 = static 함수
function randomNumber(min, max) {
  //   return Math.random() * (max - min) + min;
  return Math.random() * max;
}
