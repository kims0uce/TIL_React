export default function Tabs({ children, buttons, ButtonContainer = "menu" }) {
  // buttons 요소를 감싸는 태그를 menu 말고도 동적으로 변경하고 싶을 때
  // Container라는 props를 만들어서 설정해줄 수 있다.

  // 그냥 그대로 가져다가 쓰면 맨앞이 소문자이기 때문에 내장요소인줄 알고 그 속성을 찾게 된다.
  // 커스텀컴포넌트라는 것을 명시하기 위해 재정의 해주어야 한다.
  //   const ButtonContainer = buttonsContainer;
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  );
}
