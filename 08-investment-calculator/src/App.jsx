import { useState } from "react";
import UserInput from "./components/UserInput";
import ResultTable from "./components/ResultTable";

const CURRNET_VALUE = {
  initialInvestment: "",
  annualInvestment: "",
  expectedReturn: "",
  duration: "",
};

function App() {
  const [currentValue, setCurrentValue] = useState(CURRNET_VALUE);

  // 이 변수는는 왜 state로 관리 안하는거 ? 어차피 값 입력될 때 마다 app 랜더링 돼서 ?
  const inputValidation =
    currentValue.initialInvestment &&
    currentValue.annualInvestment &&
    currentValue.expectedReturn &&
    currentValue.duration > 0;

  const handleUpdateValue = (labelName, inputValue) => {
    setCurrentValue((prev) => {
      // +{문자열} : 문자열을 숫자로 강제 변환한다는 의미
      return { ...prev, [labelName]: +inputValue };
    });
  };

  return (
    <>
      <UserInput
        currentValue={currentValue}
        onChangeValue={handleUpdateValue}
      />
      {inputValidation && <ResultTable values={currentValue} />}
    </>
  );
}

export default App;
