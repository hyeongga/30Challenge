import axios from "axios";
import { useState } from "react";

function CreateCared({ userId, setTodos, todos }) {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitNewTodo = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          todo: newTodo,
          userId,
        }
      );

      setTodos([...todos, response.data.todo]);
      setNewTodo("");
    } catch (error) {
      console.errer(error);
      alert("새 항목 생성에 실패하였습니다.");
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitNewTodo}>
      <input
        className="grow rounded-lg bg-purple-200"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        className="mx-2 px-2 py-1 bg-purple-500 rounded-lg text-white font-bold"
        type="submit"
        value="입력"
      />
    </form>
  );
}
export default CreateCared;
