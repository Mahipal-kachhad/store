import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menubar from "./components/Menubar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
