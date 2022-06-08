import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { axios } from "axios";
import Board from "./../components/schedule/Board";

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Wrapper = styled.div`
  background-color: #b9f6ca;
  display: flex;
  width: 100vw;
  height: 100vh;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const toDoState = {
  "To Do": [],
  Done: [],
  "Do Later": [],
};

function Schedule() {
  const [toDos, setToDos] = useState(toDoState);

  const onDragEnd = (info) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        // 모든 보드에서 이동이 시작된 보드의 아이디만을 가져옴.
        // 이걸로 이동이 시작된 지점의 board ID를 알 수 있음.
        const boardCopy = [...allBoards[source.droppableId]];
        // 내가 옮기려고 하는 to do object 전체를 가져다 줌
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        // destination.droppableId는 움직임이 끝나는 board의 ID를 줌.
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board
              boardId={boardId}
              key={boardId}
              toDos={toDos[boardId]}
              state={toDoState}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default Schedule;

/*
<Draggable draggableId="second" index={1}>
{(provided) => (
  <li ref={provided.innerRef} {...provided.draggableProps}>
    <span {...provided.dragHandleProps}>🌱</span>
    two
  </li>
)}
</Draggable>
*/
