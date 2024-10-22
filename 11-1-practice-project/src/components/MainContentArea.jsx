import InputBox from "./InputBox";

export default function MainContentArea() {
  return (
    <div>
      <menu>
        <li>
          <button>Cancel</button>
        </li>
        <li>
          <button>Save</button>
        </li>
      </menu>
      <div>
        <InputBox label="Title" isTextArea />
        <InputBox label="Description" />
        <InputBox label="Due Date" />
      </div>
    </div>
  );
}
