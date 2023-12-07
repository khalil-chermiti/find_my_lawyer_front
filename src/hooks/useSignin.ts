import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import SignInAPI from "../apis/signInAPI";

interface ISignInInput {
  email: string;
  password: string;
}

const SIGN_IN_INPUT_INITIAL_STATE = {
  email: "",
  password: "",
};

const UseSignin = () => {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [signinInput, setSigninInput] = useState<ISignInInput>(
    SIGN_IN_INPUT_INITIAL_STATE
  );

  const setInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUserSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response = await SignInAPI(signinInput);

    if (response.token) {
      auth.setRoleAndToken(response.token, response.role[0]);
      navigate("/advocate");
    } else {
      alert("error " + response.message);
    }
  };

  return {
    signinInput,
    setInputValues,
    handleUserSignIn,
  };
};

export default UseSignin;
