import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import paymentAPI from "../apis/PaymentAPI";

function AdvocateProfile() {
  const { auth } = useContext(AuthContext)!;

  const handlePayment = async () => {
    if (auth.token) {
      const data = await paymentAPI(auth.token);
      if (data.payment_url) window.location.href = data.payment_url;
      console.log(data);
    }
  };

  if (auth.user)
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <img
                  className="w-20 h-20 rounded "
                  src={
                    auth.user.photoDeProfile
                      ? auth.user.photoDeProfile
                      : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }
                  alt="Large avatar"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>

                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
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
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="first name"
                  defaultValue={auth.user.nom}
                  disabled={false}
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
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="last name"
                  defaultValue={auth.user.prenom}
                  disabled={false}
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
                  type="text"
                  name="telephone"
                  id="telephone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={auth.user.telephone}
                  placeholder="enter phone number"
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
                  id="bio"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  defaultValue={auth.user.bio}
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
          </form>
        </div>
      </section>
    );

  return <h1>loading...</h1>;
}

export default AdvocateProfile;
