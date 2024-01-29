const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // 파생상태
  let gameBoard = initialGameBoard;

  // turns가 빈배열이면 어차피 for문 진입하지 못함
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // 초기값이 다차원 배열이다.
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   const handleSelectSquare = (rowIndex, colIndex) => {
  //     // 게임판의 직전 상태에 기반하여 업데이트 해야한다.
  //     // 이전 상태가 지속되도록 하는 것이 중요하기 때문이다.
  //     setGameBoard((prevGameBoard) => {
  //       //   prevGameBoard[rowIndex][colIndex] = "X";
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     // 함수가 실행되는 위치.
  //     // 플레이어가 격자판 중 한개를 클릭했을 때
  //     onSelectSquare();
  //   };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
