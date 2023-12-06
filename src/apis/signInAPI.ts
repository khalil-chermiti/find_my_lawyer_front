import { USER_ROLE } from "../contexts/AuthContext";

const SIGN_IN_API = "http://localhost:3000/auth/login";

interface ISignInInput {
  email: string;
  password: string;
}

interface ISignInResponse {
  token: string;
  role: USER_ROLE[];
  message?: string;
}

const SignInAPI = async (data: ISignInInput): Promise<ISignInResponse> => {
  const response = await fetch(SIGN_IN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return (await response.json()) as ISignInResponse;
};

export default SignInAPI;
