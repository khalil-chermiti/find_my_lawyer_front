import { Route, Routes } from "react-router";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginFrom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUpForm ROLE="AVOCAT" />} />
      </Routes>
    </>
  );
}

export default App;
