import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  // 파생상태
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // turns가 빈배열이면 어차피 for문 진입하지 못함
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const combi of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combi[0].row][combi[0].column];
    const secondSymbol = gameBoard[combi[1].row][combi[1].column];
    const thirdSymbol = gameBoard[combi[2].row][combi[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}

// 매차례마다 재실행되고 있다.
function App() {
  const [players, setPlayers] = useState(PLAYERS);

  // gameTurns 상태가 현재 플레이어 및 격자판 어디를 선택했는지에 대한 정보까지 모두 가지고 있다.
  // 하나의 상태에 최대한 많은 정보를 담고 파생해 나가는 것이 좋다.
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  // 무승부일때
  const hasDraw = gameTurns.length === 9 && !winner;

  // 함수가 정의되는 위치.
  // 어떤 (행, 열)을 클릭했는지 정보를 받아온다.
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        // player 정보에  activePlayer를 넣지 않는다.
        // 상태를 병합하지 않는 것이 중요하다.
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handleUpdatePlayer = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };
  // <main>을 wrapper element로 사용하여 각 빌딩블록을 감싼다.
  // <ol> 태그를 사용한 이유는 플레이어 간 순서가 존재하기 때문이다.
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="PLAYERS.X"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleUpdatePlayer}
          />
          <Player
            initialName="PLAYERS.O"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleUpdatePlayer}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
