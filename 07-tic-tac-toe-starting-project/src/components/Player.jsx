import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  // 데이터를 조정하여 UI 수정 후 업데이트 되도록 하기위해 useState 활용한다.
  // 상태값을 생성함으로써 해당 값을 수정할 수 있는 함수를 가져온다.
  // 이 함수를 통해 리액트는 UI를 수정한다.
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  // handle 함수가 불리면 해당 컴포넌트가 한번 리렌더링 되고,
  // 코드에서 변경사항이 존재하면 DOM과 다른 컴포넌트에 반영된다.
  const handleEditButton = () => {
    setIsEditing((editing) => !editing);
  };

  // input 태그의 onChange 요소는 매 입력에 의해 발동되고,
  // 이벤트 객체를 제공하는데 객체의 내용은 이용자가 작성한 값이다.
  const handleChangeName = (e) => {
    // .target : 그 이벤트가 방출한 요소를 참조한다.
    // .value : 이용자가 작성하려고 한 값을 저장한다.
    setPlayerName(e.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName} onChange={handleChangeName} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
