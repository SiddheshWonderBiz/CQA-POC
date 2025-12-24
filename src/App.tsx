import Navbar from "./common/Navbar"

import "./App.css"
import { BrowserRouter , Route, Routes } from "react-router-dom"
import Spreadsheet from "./components/spreadsheet/Spreadsheet"


function App() {
  return (
    <div  >
      <Navbar />
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Spreadsheet />} />
            {/* <Route path="/graph" element={<GraphSpreadsheet />} /> */}
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  )
}
export default App
