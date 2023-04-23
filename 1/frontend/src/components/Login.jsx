import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [createAccount, setCreateAccount] = useState("");
  const [account, setAccount] = useState("");

  const onSubmitCreateUser = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          account: createAccount,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      alert("계정 생성을 실패하였습니다.");
    }
  };

  const newSubmit = (e) => {
    return setCreateAccount(e.target.value);
  };

  const onSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${account}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      alert("없는 아이디입니다.");
    }
  };

  return (
    <div className="h-screen bg-purple-100 flex flex-col justify-center items-center">
      <form onSubmit={onSubmitCreateUser}>
        <input
          className=" px-2 py-2 rounded-lg focus:outline-purple-500 bg-purple-200"
          type="text"
          value={createAccount}
          onChange={newSubmit}
        />
        <input
          className="w-20 ml-2 px-2 py-2 rounded-lg  text-purple-500 font-bold hover:bg-violet-500 hover:text-white "
          type="submit"
          value="신규가입"
        />
      </form>

      <form className="mt-2" onSubmit={onSubmitLogin}>
        <input
          className="px-2 py-2 rounded-lg focus:outline-purple-500 bg-purple-200"
          type="text"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
        <input
          className="w-20 ml-2 px-2 py-2 rounded-lg text-purple-500 font-bold hover:bg-violet-500 hover:text-white"
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
}

export default Login;
