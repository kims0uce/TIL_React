import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// 변수는 컴포넌트 함수 밖에 생성해 놓아야
// 리렌더링 되더라도 새로운 timer라는 변수를 만들지 않는다.

// 대신 여기에 만들면
// 해당 컴포넌트의 모든 인스턴스가 모두 이 변수를 쓴다.
// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemain, setTimeRemain] = useState(targetTime * 1000);

  const timerIsActive = timeRemain > 0 && timeRemain < targetTime * 1000;

  if (timeRemain <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleStart = () => {
    // 10 ms마다 체크
    timer.current = setInterval(() => {
      setTimeRemain((prev) => prev - 10);
    }, 10);
  };

  const handleStop = () => {
    dialog.current.open();
    clearInterval(timer.current);
  };

  const handleReset = () => {
    setTimeRemain(targetTime * 1000);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemain={timeRemain}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {timeRemain <= 0 && <p> You Lost !!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive "}
        </p>
      </section>
    </>
  );
}
