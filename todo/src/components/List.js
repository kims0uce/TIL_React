// extension : ES7+ : rfc 치면 와꾸 만들어준다.
// 컴포넌트를 나눌 때는 정답이 없다. 재사용성이 높도록 나눠준다.
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const handleEnd = (result) => {
    // 목적지가 없으면 그대로 리턴한다.
    if (!result.destination) return;

    // 목적지가 있다면 순서를 변경하고 화면에 출력한다.
    const newTodoData = todoData;

    // splice() : 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
    // 1. 변경되는 아이템을 배열에서 지운다.
    // 2. 리턴값으로 지워진 아이템을 reorderedItem에 저장한다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 위치에 reorderedItem을 배치한다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            // Droppable에서 div로 정보를 전달한다
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
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
                          defaultChecked={data.completed}
                          onChange={() => handelCompleteChange(data.id)}
                        />{" "}
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className="item-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
