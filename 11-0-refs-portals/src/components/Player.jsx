import { useState, useRef } from "react";

export default function Player() {
  const userInput = useRef();

  const [userName, setUserName] = useState(null);

  const handleClick = (e) => {
    // useRef로 받는 참조값들은 항상 자바스크립트 객체이며
    // 항상 current 속성을 가지고 있다.
    // current input 태그의 모든 요소(메소드, 속성)를 값으로 보관한다.
    setUserName(userInput.current.value);
  };

  return (
    <section id="player">
      <h2>Welcome {userName ?? "unknown entity"}</h2>
      <p>
        <input ref={userInput} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
