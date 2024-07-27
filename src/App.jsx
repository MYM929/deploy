import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Dallas from "./Components/Cities/Dallas.jsx"
import Boston from "./Components/Cities/Boston.jsx"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/deploy" element={<Home/>}/>
        <Route path="/city/dallas" element={<Dallas/>}/>
        <Route path="/city/boston" element={<Boston/>}/>
      </Routes>
    </>
  );
};

export default App;