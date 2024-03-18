const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
  };

  return {
    render,
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
      createPlayer(document.querySelector("#player2").value, "0"),
    ];
    currenPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };
  return {
    start,
  };
})();

const startBtn = document.querySelector("#start-button");
const restartBtn = document.querySelector("#restart-button");
const gameboard = document.querySelector("#gameboard");

startBtn.addEventListener("click", () => {
  Game.start();
});
