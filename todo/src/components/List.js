import React from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    console.log("List is rendering...");
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
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      >
        <div className="item-center">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handelCompleteChange(id)}
          />{" "}
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div className="item-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >
            X
          </button>
        </div>
      </div>
    );
  }
);

export default List;
