// extension : ES7+ : rfc 치면 와꾸 만들어준다.
// 컴포넌트를 나눌 때는 정답이 없다. 재사용성이 높도록 나눠준다.
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import List from "./List";

const Lists = React.memo(({ todoData, setTodoData }) => {
  console.log("Lists is rendering...");
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
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
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
});

export default Lists;
