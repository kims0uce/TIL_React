import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // gameTurns 상태가 현재 플레이어 및 격자판 어디를 선택했는지에 대한 정보까지 모두 가지고 있다.
  // 하나의 상태에 최대한 많은 정보를 담고 파생해 나가는 것이 좋다.
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
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
  // <main>을 wrapper element로 사용하여 각 빌딩블록을 감싼다.
  // <ol> 태그를 사용한 이유는 플레이어 간 순서가 존재하기 때문이다.
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
