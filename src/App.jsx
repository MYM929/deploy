import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Dallas from "./Components/Cities/Dallas.jsx"
import Boston from "./Components/Cities/Boston.jsx"
import CityTemplate from "./Components/Cities/cityTemplate.jsx"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/deploy" element={<Home/>}/>
        <Route path="/deploy/city/dallas" element={<Dallas/>}/>
        <Route path="/deploy/city/boston" element={<Boston/>}/>
        <Route path="/deploy/city/cityTemplate" element={<CityTemplate/>}/>
      </Routes>
    </>
  );
};

export default App;