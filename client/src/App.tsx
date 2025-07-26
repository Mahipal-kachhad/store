import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menubar from "./components/Menubar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import { Toaster } from "react-hot-toast";
import RegisterForm from "./components/RegisterForm";
import ForgotPassword from "./components/ForgetPassword";

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
