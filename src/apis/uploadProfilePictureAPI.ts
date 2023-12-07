const UPLOAD_PROFILE_PICTURE_API =
  "http://localhost:3000/advocate/profile-picture";

const updateAdvocateProfilePicture = async (
  formData: FormData,
  token: string
): Promise<any> => {
  const response = await fetch(UPLOAD_PROFILE_PICTURE_API, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  return (await response.json()) as { message: string };
};

export default updateAdvocateProfilePicture;
