import Navbar from "./common/Navbar"
import "./App.css"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoSpreadsheet from "./Demo/components/DemoSpreadsheet";
import  Spreadsheet  from "./components/spreadsheet/Spreadsheet";

const App: React.FC = () => {
  return (
    <div  >
      <Navbar />
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DemoSpreadsheet />} />
            <Route path="/import" element = {<Spreadsheet/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;