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

  const handleUpdateValue = (labelName, inputValue) => {
    setCurrentValue((prev) => {
      return { ...prev, [labelName]: inputValue };
    });
  };

  return (
    <>
      <UserInput onChangeValue={handleUpdateValue} />
      <ResultTable values={currentValue} />
    </>
  );
}

export default App;
