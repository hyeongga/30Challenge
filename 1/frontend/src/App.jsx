import { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState();
  const [isDone, setIsDone] = useState(true);
  let index;
  const getTodos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/13`
      );

      if (response.status !== 200) {
        alert("데이터를 불러오지 못했습니다");
      }
      console.log(response.data.todos);
      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);

      alert("투두리스트를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Login />
      <div className="min-h-screen flex flex-col justify-center items-center pt-8">
        <div>
          <div className="mt-8 font-bold flex justify-center text-xl">
            To Do List
          </div>
          <div>
            자신의 일은 스스로하자 스스로를 연민하지 말자 차근차근 나아가자
          </div>
          <form className="flex mt-2">
            <input className="grow bg-purple-200" type="text" />
            <input className="mx-2" type="submit" value="입력" />
          </form>
        </div>

        <div>
          {todos &&
            todos.map((v, i) => {
              return (
                <div className=" flex justify-start m-4 ">
                  {isDone ? (
                    <button className="relative">
                      <div className="h-8 w-8 border-4 border-purple-500 rounded-xl"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-75 h-8 w-8 border-4 border-white rounded-xl bg-purple-500 "></div>
                    </button>
                  ) : (
                    // <div></div>
                    <button className="h-8 w-8 border-4 border-purple-500 rounded-xl"></button>
                  )}
                  {/* <li key = {index}> 내용 </li> */}
                  <div className="m-4 ">{todos[i].todo}</div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
