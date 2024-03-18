const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  return {
    render,
    update,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currenPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    currenPlayerIndex = 0;
    gameOver = false;

    Gameboard.render();

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };

  const handleClick = (e) => {
    let index = e.target.id.split("-")[1];

    Gameboard.update(index, players[currenPlayerIndex].mark);

    currenPlayerIndex = currenPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    handleClick,
  };
})();

const startBtn = document.querySelector("#start-button");
const restartBtn = document.querySelector("#restart-button");

startBtn.addEventListener("click", () => {
  Game.start();
});
