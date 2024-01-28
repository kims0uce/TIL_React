export default function TabButton(props) {
  // children prop은 리액트에서 제공해주는 속성이기 때문에 이름을 그대로 가져가야 함
  // 다른 props는 사용자가 마음대로 지정할 수 있음
  const { children, onSelect, isSelected } = props;

  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
