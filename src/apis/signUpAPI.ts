import { USER_ROLE } from "../contexts/AuthContext";

const SIGN_UP_API = "http://localhost:3000/auth/register";

interface ISignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ISignUpResponse {
  statusCode?: number;
  message: string;
}

const SignUpApi = async (
  data: ISignUpInput,
  role: USER_ROLE
): Promise<ISignUpResponse> => {
  const response = await fetch(`${SIGN_UP_API}?role=${role}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return (await response.json()) as ISignUpResponse;
};

export default SignUpApi;
