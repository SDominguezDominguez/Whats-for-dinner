import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import SearchMyFridge from "./pages/SearchMyFridge/SearchMyFridge";
import WeekMenu from "./pages/WeekMenu/WeekMenu";
import WhatShouldIMake from "./pages/WhatShouldIMake/WhatShouldIMake";

function App() {
  return (
      <>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="search-my-fridge" element={<SearchMyFridge/>}/>
          <Route path="week-menu" element={<WeekMenu/>}/>
          <Route path="what-should-i-make" element={<WhatShouldIMake/>}/>
        </Routes>
      </>
  )
      ;
}

export default App;
