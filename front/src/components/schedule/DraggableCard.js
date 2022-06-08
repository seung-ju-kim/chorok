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

function DraggableCard({ toDoId, index, toDoText }) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

// react.memo => react에게 prop이 변하지 않았다면
// DraggableCard를 다시 렌더링하지 말라고함.
export default React.memo(DraggableCard);
