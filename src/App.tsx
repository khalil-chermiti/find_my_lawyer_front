import { Route, Routes } from "react-router";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginFrom";
import AdvocateProfile from "./components/AdvocateProfile";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import getAdvocateProfileData from "./apis/getAdvocateProfileData";

function App() {
  const { auth, setUser, hydrateAuth, persistAuth } = useContext(AuthContext)!;

  // fetch advocate profile data on auth change
  useEffect(() => {
    if (auth.token) {
      getAdvocateProfileData(auth.token)
        .then(data => {
          console.log(data);
          setUser(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [auth.token]);

  // hydrate auth object on page load
  useEffect(() => {
    hydrateAuth();
  }, []);

  // persist auth on auth change
  useEffect(() => {
    persistAuth();
  }, [auth]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUpForm ROLE="AVOCAT" />} />
        <Route path="/advocate" element={<AdvocateProfile />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
