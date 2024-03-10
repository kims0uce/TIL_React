import { useState, useRef } from "react";

// 변수는 컴포넌트 함수 밖에 생성해 놓아야
// 리렌더링 되더라도 새로운 timer라는 변수를 만들지 않는다.

// 대신 여기에 만들면
// 해당 컴포넌트의 모든 인스턴스가 모두 이 변수를 쓴다.
// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const [isExpired, setIsExpired] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      // 플레이어가 버튼을 누르기 전에 여기에 도달하면
      // 패배.
      setIsExpired(true);
    }, targetTime * 1000);
    // 타이머를 시작하기 바로 직전에
    // isStarted 상태를 true로 변경한다.
    // 위치는 상관없음
    // (여기에 작성해도 타이머가 끝난 시점이 아니라 setTimer가 동작한 바로 이후에 실행될 것이기 때문)
    setIsStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {isExpired && <p> You Lost !!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={isStarted ? handleStop : handleStart}>
          {isStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={isStarted ? "active" : undefined}>
        {isStarted ? "Time is running..." : "Timer inactive "}
      </p>
    </section>
  );
}
