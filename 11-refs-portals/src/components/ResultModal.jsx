import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = ({ timeRemain, targetTime, onReset }, ref) => {
  const dialog = useRef();

  const userLost = timeRemain <= 0;
  const formattedRemainTime = (timeRemain / 1000).toFixed(2);
  const score = Math.round((1 - timeRemain / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      // 다른 컴포넌트에 노출되어야 하는 모든 속성과 메소드를 묶어
      // "객체"를 반환한다.
      open() {
        dialog.current.showModal();
      },
    };
  });
  return (
    <dialog ref={dialog} className="result-modal">
      {userLost ? <h2>You Lost </h2> : <h2>Your Score : {score}</h2>}

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default forwardRef(ResultModal);
