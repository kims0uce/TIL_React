// react 라이브러리에서 -> 어떠한 기능을 작성하는데 도움
// React 와 Component 클래스를 가져온다.
import React, { useState, useCallback } from "react";
// App.css 적용
import "./App.css";
// List라는 자녀 컴포넌트를 만듦
import Lists from "./components/Lists";
import Form from "./components/Form";

export default function App() {
  console.log("App is rendering...");
  // const [ 변수이름, state를 정하는 함수]
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // this.filter() 메소드를 사용하여 할일 목록을 지운다.
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  // handleSubmit은 todoData와 value 모두 다루고 있기 때문에
  // App.js 컴포넌트 안에서 처리하는 것이 좋다.
  const handleSubmit = (e) => {
    // 새로운 value가 들어왔을 때 페이지가 reload 되는 것을 막아준다.
    e.preventDefault();

    // 새로운 할일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // setState : state를 바꿀 때 사용한다.
    // ... : 전개연산자
    // this.setState({todoData: [...todoData, newTodo], value: ""})

    // setter에서 이전 state를 가지고 오기 위해서는 인수에 함수를 사용할 수 있다.
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  // render 메소드 안에서 ui를 작성한다.
  // 함수형 컴포넌트를 사용시에는 render 메소드가 필요없다.
  // this.{배열명}.map() : map 메서드를 통해 데이터 나열
  /* JSX key속성
    -> 리액트에서 요소의 리스트를 나열할 때는 key를 넣어주어야 한다. 
    -> 키는 리액트가 변경, 추가 또는 제거된 항목을 식별하는데 도움이 된다. 
    -> 요소에 안정적인 ID를 부여하려면 배열 내부의 요소에 키를 제공해야 한다.  
    -> diffing 시, key를 이용해서 어떠한 부분이 바뀌었는지 인식할 수 있다. 
    key에는 유니크한 값을 넣어주고, key가 없다면 index를 키로 사용한다. 
    index를 사용하는 방법은 권장되지 않는데, 그 이유는 원소의 순서가 바뀔 때 마다 키값이 변하기 때문이다. 
  */
  // 태그 안에 사용한 {}는 자바스크립트를 실행시킨다 .
  // 함수형 컴포넌트 안에서는 render()가 필요없다.
  // render() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
  // }
}
