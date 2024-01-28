import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  // <main>을 wrapper element로 사용하여 각 빌딩블록을 감싼다.
  // <ol> 태그를 사용한 이유는 플레이어 간 순서가 존재하기 때문이다.
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
