import Navbar from "./common/Navbar"
import "./App.css"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spreadsheet from "./Demo/components/Spreadsheet";

const App: React.FC = () => {
  return (
    <div  >
      <Navbar />
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Spreadsheet />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;