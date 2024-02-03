import InputGroup from "./InputGroup";

export default function UserInput({ onChangeValue }) {
  return (
    <div id="user-input">
      <div className="input-group">
        <InputGroup
          labelName="INITIAL INVESTMENT"
          onChangeValue={onChangeValue}
        />
        <InputGroup
          labelName="ANNUAL INVESTMENT"
          onChangeValue={onChangeValue}
        />
      </div>
      <div className="input-group">
        <InputGroup labelName="EXPECTED RETURN" onChangeValue={onChangeValue} />
        <InputGroup labelName="DURATION" onChangeValue={onChangeValue} />
      </div>
    </div>
  );
}
