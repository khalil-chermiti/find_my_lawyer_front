const UPDATE_ADVOCATE_PROFILE_API = "http://localhost:3000/advocate/update";

interface IupdateDATA {
  nom: string;
  prenom: string;
  telephone: string;
  bio: string;
}
const updateAdvocateProfile = async (
  updateData: IupdateDATA,
  token: string
): Promise<any> => {
  const response = await fetch(UPDATE_ADVOCATE_PROFILE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(updateData),
  });

  return (await response.json()) as { message: string };
};

export default updateAdvocateProfile;
