
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function stepBot(step,cells) {
  while(true) {
    const idx = randomInteger(0,8);
    if(cells[idx].textContent == "") {
       cells[idx].textContent = "0";
       text.textContent = "X ходит";
       return ++step;
    }
  }
}

function checkWinner(rules) {
  let options = Array.from(cells).map(cell=>cell.textContent)
  for (let i = 0; i < rules.length; i++) {
    let condition = rules[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  let options = Array.from(cells).map(cell=>cell.textContent)
  return !options.includes('')
}



const rules = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let step = 0;
const cells = document.querySelectorAll(".cell");
const text = document.querySelector(".text");
const restartBtn = document.querySelector(".restart__btn");
let win = false

restartBtn.onclick = () => {
  options = ["", "", "", "", "", "", "", "", ""];
  text.textContent = "";
  cells.forEach((cell) => (cell.textContent = ""));
  step = 0;
  win = false;
};


document.querySelector(".field").onclick = (e) => {
  if (e.target.textContent == "" && win == false){
    if (step % 2 == 0) {
      e.target.textContent = "X";
      text.textContent = "0 ходит"
      step++;
      let resWinner = checkWinner(rules);
      if (resWinner) {
        text.textContent = "User win";
        win = true;
      } else if (checkDraw()) {
        text.textContent = "Ничья"
      }
      else {
        setTimeout(() => {
          step = stepBot(step, cells);
          resWinner = checkWinner(rules);
          if (resWinner) {
            text.textContent = "Bot win";
            win = true
          }
        }, 1000);
      }
    }
  }
}