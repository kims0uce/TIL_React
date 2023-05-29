// extension : ES7+ : rfc 치면 와꾸 만들어준다.
// 컴포넌트를 나눌 때는 정답이 없다. 재사용성이 높도록 나눠준다.
import React from "react";

export default function List({ todoData, setTodoData }) {
  // this.filter() 메소드를 사용하여 할일 목록을 지운다.
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log("newTodoData", newTodoData);
    setTodoData(newTodoData);
  };

  // 완료한 할 일 가로선 긋기
  const handelCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    // this.setState({todoData: newTodoData});
    setTodoData(newTodoData);
  };

  return (
    <div>
      {todoData.map((data) => (
        <div key={data.id}>
          <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded ">
            <div>
              <input
                type="checkbox"
                defaultChecked={data.completed}
                onChange={() => handelCompleteChange(data.id)}
              />{" "}
              <span className={data.completed ? "line-through" : undefined}>
                {data.title}
              </span>
            </div>
            <div>
              <button
                className="px-4 py-2 float-right"
                onClick={() => handleClick(data.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
