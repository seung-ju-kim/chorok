import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

const TODO = "/todos";

export const getTodo = async () => {
  const response = await api.get(TODO);

  return response;
};

export const addTodo = async (todo) => {
  await api.post(TODO, todo);
};
