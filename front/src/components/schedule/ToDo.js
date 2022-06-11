import React, { useState } from "react";
import ToDoEditFrom from "./ToDoEditForm";
import ToDos from "./ToDos";

function ToDo() {
  const [isEditing, setIsEditing] = useState(false);
  return <>{isEditing ? <ToDoEditFrom /> : <ToDos />}</>;
}

export default ToDo;
