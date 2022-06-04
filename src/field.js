"use strict";
const carrotSound = new Audio("sound/carrot_pull.mp3");
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      playSound(carrotSound);
      // this.가 객체를 반환하지x , this.onItemClick이 undefined
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
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

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
