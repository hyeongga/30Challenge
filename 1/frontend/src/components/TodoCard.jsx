import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

const TodoCard = ({ todo, isDone, id, userId, todos, setTodos }) => {
  const [todoIsDone, setTodoIsDone] = useState(isDone);
  const onClickDone = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${id}/done`,
        {
          userId,
        }
      );
      setTodoIsDone(response.data.updatedTodo.isDone);
    } catch (error) {
      console.error(error);
      alert("두두 완료 중 에러가 발생했습니다.");
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${id}`,
        {
          data: { userId },
        }
      );
      const array = todos.filter((v, i) => {
        return v.id !== response.data.deletedTodo.id;
      });
      setTodos(array);
    } catch (error) {
      console.error(error);
      alert("오류가 발생하였습니다.");
    }
  };

  return (
    <div className=" flex mt-4 justify-between">
      <div className="flex">
        {todoIsDone ? (
          <button className="relative" onClick={onClickDone}>
            <div className="h-8 w-8 border-4 border-purple-500 rounded-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-75 h-8 w-8 border-4 border-white rounded-xl bg-purple-500 "></div>
          </button>
        ) : (
          <button
            className="h-8 w-8 border-4 border-purple-500 rounded-xl"
            onClick={onClickDone}
          ></button>
        )}
        <div className="mx-4">{todo}</div>
      </div>
      <button className="text-purple-300 hover:text-purple-800">
        <AiOutlineDelete size={20} onClick={onClickDelete} />
      </button>
    </div>
  );
};
export default TodoCard;
