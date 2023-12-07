import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import paymentAPI from "../apis/PaymentAPI";
import uploadProfilePicture from "../apis/uploadProfilePictureAPI";
import updateAdvocateProfile from "../apis/UpdateAdvocateProfileAPI";

function AdvocateProfile() {
  const [img, setImg] = useState<File>();
  const { auth } = useContext(AuthContext)!;
  const [fields, setFields] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    bio: "",
  });

  const handlePayment = async () => {
    if (auth.token) {
      const data = await paymentAPI(auth.token);
      if (data.payment_url) window.location.href = data.payment_url;
    }
  };

  const handleUpdate = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // upload file to server
    const formData = new FormData();
    if (img) {
      formData.append("file", img);
      const response = await uploadProfilePicture(formData, auth.token!);
      if (response.message) console.log(response.message);
    }

    // update user profile
    const updateResponse = await updateAdvocateProfile(fields, auth.token!);
    console.log(updateResponse);

    window.location.reload();
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields(prev => ({ ...prev, [event.target.id]: event.target.value }));
  };

  useEffect(() => {
    if (auth.user) {
      setFields({
        nom: auth.user.nom,
        prenom: auth.user.prenom,
        telephone: auth.user.telephone,
        bio: auth.user.bio,
      });
    }
  }, [auth.user]);

  if (auth.user)
    return (
      <section className="bg-white dark:bg-gray-900">
        <form onSubmit={handleUpdate}>
          <div className="mx-auto rounded-full w-60 h-60 overflow-hidden">
            <img
              src={
                auth.user.photoDeProfile
                  ? auth.user.photoDeProfile
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="image description"
            />
          </div>

          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={e => {
                    if (e.target.files) setImg(e.target.files![0]);
                  }}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  first name
                </label>
                <input
                  min={3}
                  max={80}
                  type="text"
                  name="nom"
                  id="nom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="first name"
                  defaultValue={fields.nom}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  last name
                </label>
                <input
                  min={3}
                  max={80}
                  type="text"
                  name="prenom"
                  id="prenom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="last name"
                  defaultValue={fields.prenom}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={auth.user.email}
                  disabled={true}
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="telephone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  telephone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  id="telephone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={fields.telephone}
                  placeholder="enter phone number"
                  onChange={handleFieldChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  defaultValue={auth.user.bio}
                  onChange={handleFieldChange}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              update profile
            </button>
            {auth.user.active ? (
              ""
            ) : (
              <button
                type="button"
                className="m-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handlePayment}
              >
                activate account
              </button>
            )}
          </div>
        </form>
      </section>
    );

  return <h1>loading...</h1>;
}

export default AdvocateProfile;
