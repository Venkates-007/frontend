let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("rst-button");
let newGameBtn = document.getElementById("new-button");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// console.log(boxes);
let turnO = true;

let count =0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


/*
*** play function with  event handler ke saath
*/
boxes.forEach((element) => {
  element.addEventListener("click", () => {
    if (turnO) {
      element.innerText = "X";
      turnO = false;
    } else {
      element.innerText = "O";
      turnO = true;
    }
    element.disabled = true;
    count ++;

    let isWinner=checkWinner();
    if (count===9&& !isWinner) {
        gameDraw();
    }

  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
 disableBox();
};
/*
 * enable the boxes
*/
const enableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

/*
    *to dis-able the boxes
*/ 
const disableBox = () => {
  for (let box of boxes) {
    // box.disabled = true;
    box.disabled=true;
  }
};

// game reset function

const resetGame = () => {
  turnO = true;
  count=0;
  enableBox();
  msgContainer.classList.add("hide");
};

// winner msg function 

const showWinner = (winner) => {
  msg.innerText = `Congratulations , Winner is${winner}`;
  msgContainer.classList.remove("hide");
  disableBox();
};

// to check the winner 

let checkWinner = () => {
  for (let pattern of winPattern) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
