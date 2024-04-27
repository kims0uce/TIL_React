import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // useEffect를 통해 컴포넌트가 사라질때 setTimeout함수의 실행을 멈춘다.
  useEffect(() => {
    // 3초가 지나면 콜백함수가 실행된다.
    console.log("SET TIMER");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // useEffect가 리턴하는 함수는
    // effect 함수가 다시 작동하기 바로 전이나, 컴포넌트가 사라지기 바로 전에 실행된다.
    // 즉 DOM에서 삭제되기 전 실행된다.
    return () => {
      console.log("Cleaning up TIMER...");
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
