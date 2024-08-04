import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import CityTemplate from "./Components/Cities/cityTemplate.jsx";
import { CityData } from './cityData.js'; 

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route 
          path="/city/Dallas" 
          element={<CityTemplate cityName={CityData.Dallas.cityName} cityImage={CityData.Dallas.cityImage} />}
        />
        <Route 
          path="/city/OklahomaCity" 
          element={<CityTemplate cityName={CityData.OklahomaCity.cityName} cityImage={CityData.OklahomaCity.cityImage} />}
        />
        <Route 
          path="/city/Houston" 
          element={<CityTemplate cityName={CityData.Houston.cityName} cityImage={CityData.Houston.cityImage} />}
        />
        <Route 
          path="/city/NewYork" 
          element={<CityTemplate cityName={CityData.NewYork.cityName} cityImage={CityData.NewYork.cityImage} />}
        />        
        <Route 
          path="/city/Boston" 
          element={<CityTemplate cityName={CityData.LosAngeles.cityName} cityImage={CityData.LosAngeles.cityImage} />}
        />
        <Route 
          path="/city/SanFrancisco" 
          element={<CityTemplate cityName={CityData.SanFrancisco.cityName} cityImage={CityData.SanFrancisco.cityImage} />}
        />
        <Route 
          path="/city/LosAngeles" 
          element={<CityTemplate cityName={CityData.LosAngeles.cityName} cityImage={CityData.LosAngeles.cityImage} />}
        />

      </Routes>
    </>
  );
};

export default App;





