import { useState } from "react";
import { USER_ROLE } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import signUpAPI from "../apis/signUpAPI";

interface IsignupInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SIGN_UP_INPUT_INITIAL_STATE = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const UseSignUp = () => {
  const navigate = useNavigate();
  const [signinInput, setSigninInput] = useState<IsignupInput>(
    SIGN_UP_INPUT_INITIAL_STATE
  );

  const setInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // sign up avocat
  const handleUserSignup = async (role: USER_ROLE) => {
    let response = null;

    if (role === "AVOCAT") {
      response = await signUpAPI(signinInput, role);
      if (response.statusCode) return alert(response.message);
      if (response.message) navigate("/login");
    }
  };

  return { signinInput, setInputValues, handleUserSignup };
};

export default UseSignUp;
