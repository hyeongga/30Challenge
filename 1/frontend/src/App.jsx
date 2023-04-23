import { useState, useEffect } from "react";
import Login from "./components/Login";
import CreateCard from "./components/CreateCard";
import axios from "axios";
import TodoCard from "./components/TodoCard";
import { FiLogOut } from "react-icons/fi";

function App() {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState("");

  const getTodos = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}`
      );

      if (response.status !== 200) {
        alert("데이터를 불러오지 못했습니다");
      }

      setTodos(response.data.todos);
      console.log(response);
    } catch (error) {
      console.error(error);

      alert("투두리스트를 불러오지 못했습니다.");
    }
  };

  const onClickLogout = async () => {
    return setUser(undefined);
  };

  useEffect(() => {
    getTodos();
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col justify-start items-center pt-8">
        <div>
          <div className="relative">
            <h1 className="flex justify-center mt-8 font-bold text-xl">
              ✨ {user.account}님의 To Do List ✨
            </h1>
            <button className="absolute top-1/2 left-[90%] -translate-y-1/2 -translate-x-1/2 hover:text-purple-800">
              <FiLogOut onClick={onClickLogout} />
            </button>
          </div>
          <div className="my-2">
            거침없이! 퐈이팅 해야지! 거침없이! 퐈이팅 해야지!
          </div>
          <CreateCard userId={user.id} todos={todos} setTodos={setTodos} />
        </div>
        <div>
          {todos &&
            todos.map((v, i) => {
              return (
                <TodoCard
                  key={i}
                  todo={v.todo}
                  isDone={v.isDone}
                  id={v.id}
                  userId={user.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
