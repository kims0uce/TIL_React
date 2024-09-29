import InputGroup from "./InputGroup";

export default function UserInput({ currentValue, onChangeValue }) {
  return (
    <div id="user-input">
      <div className="input-group">
        <InputGroup
          labelName="INITIAL INVESTMENT"
          currentValue={currentValue}
          onChangeValue={onChangeValue}
        />
        <InputGroup
          labelName="ANNUAL INVESTMENT"
          currentValue={currentValue}
          onChangeValue={onChangeValue}
        />
      </div>
      <div className="input-group">
        <InputGroup
          labelName="EXPECTED RETURN"
          currentValue={currentValue}
          onChangeValue={onChangeValue}
        />
        <InputGroup
          labelName="DURATION"
          currentValue={currentValue}
          onChangeValue={onChangeValue}
        />
      </div>
    </div>
  );
}
