import { Avocat } from "../contexts/AuthContext";

const GET_ADVOCATE_DATA_API = "http://localhost:3000/advocate/profile";

const getAdvocateProfileData = async (token: string): Promise<any> => {
  const response = await fetch(GET_ADVOCATE_DATA_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return (await response.json()) as Avocat | { message: string };
};

export default getAdvocateProfileData;
