import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  padding: 10px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDragging ? "#b9f6ca" : "white")};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const CardDeleteButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isDragging === true ? "white" : "rgba(178, 190, 195,1.0)"};
  color: ${(props) =>
    props.isDragging === true ? "rgba(178, 190, 195,1.0)" : "white"};
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
`;

function DraggableCard({ boardId, toDoId, index, toDoText, setLists }) {
  console.log(setLists);
  const handleDeleteTodo = (toDoId) => {
    setLists((todos) => {
      const copiedTodos = [...todos[boardId]];
      const filteredTodos = copiedTodos.filter((todo) => todo.id !== toDoId);
      const result = { ...todos, [boardId]: filteredTodos };
      return result;
    });
  };
  return (
    <>
      <Draggable draggableId={toDoId + ""} index={index} key={toDoId}>
        {(provided, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
            <CardDeleteButton
              isDragging={snapshot.isDragging}
              onClick={() => handleDeleteTodo(toDoId)}
              type="button"
            >
              ✕
            </CardDeleteButton>
          </Card>
        )}
      </Draggable>
    </>
  );
}

// react.memo => react에게 prop이 변하지 않았다면
// DraggableCard를 다시 렌더링하지 말라고함.
export default React.memo(DraggableCard);
