import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CreateSocialsProfile from "./components/CreateSocialsProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<CreateSocialsProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
