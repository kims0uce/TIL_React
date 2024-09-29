export default function Log({ turns }) {
  // 플레이어가 버튼을 클릭할 때 마다 row가 증가되는 동적배열
  // 현재까지 게임에서 진행된 순서에 대한 반환된 정보를 보여준다.
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected ({turn.square.row}, {turn.square.col})
        </li>
      ))}
    </ol>
  );
}
