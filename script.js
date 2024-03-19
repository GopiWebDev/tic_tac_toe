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

  const getGameboard = () => gameboard;

  return {
    render,
    update,
    getGameboard,
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
  let currentPlayerIndex;
  let GameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];

    currentPlayerIndex = 0;
    GameOver = false;
    Gameboard.render();

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    document.querySelector("#message").innerHTML = "";
    GameOver = false;
    Gameboard.render();
  };

  const handleClick = (e) => {
    if (GameOver) {
      return;
    }
    const index = parseInt(e.target.id.split("-")[1]);
    if (Gameboard.getGameboard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)
    ) {
      GameOver = true;
      if (players[currentPlayerIndex].name === "") {
        document.querySelector(
          "#message"
        ).innerHTML = `Player Won, Press Restart`;
      } else {
        document.querySelector(
          "#message"
        ).innerHTML = `${players[currentPlayerIndex].name} Won, Press Restart`;
      }
    } else if (checkForTie(Gameboard.getGameboard())) {
      GameOver = true;
      document.querySelector(
        "#message"
      ).innerHTML = `It's a tie, Press Restart`;
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    restart,
    handleClick,
  };
})();

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => {
  Game.start();
});

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", () => {
  Game.restart();
});

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}
