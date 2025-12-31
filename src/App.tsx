// import Navbar from "./common/Navbar"

// import "./App.css"
// import { BrowserRouter , Route, Routes } from "react-router-dom"
// import Spreadsheet from "./components/spreadsheet/Spreadsheet"


// function App() {
//   return (
//     <div  >
//       <Navbar />
//       <div className="content">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Spreadsheet />} />
//             {/* <Route path="/graph" element={<GraphSpreadsheet />} /> */}
//           </Routes>
//         </BrowserRouter>
//       </div>

//     </div>
//   )
// }
// export default App



// import React from "react";
// // import Navbar from "./common/Navbar";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Spreadsheet from "./Demo/components/Spreadsheet";
// import { createComparisonChart } from "./Demo/utils/chartUtils";

// function App() {
//   const handleInit = (spread: any) => {
//     // You can now safely create the chart
//     createComparisonChart(spread, 24, 5); // 24 months, 5 items
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="content">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Spreadsheet onInit={handleInit} />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// }

// export default App;



// import React from "react";
// // import Navbar from "./common/Navbar";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Spreadsheet from "./Demo/components/Spreadsheet";
// import { createComparisonChart } from "./Demo/utils/chartUtils";
// const App: React.FC = () => {
//   const handleInit = (spread: any) => {
//     createComparisonChart(spread, 24, 5); // 24 months, 5 items
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Spreadsheet onInit={handleInit} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spreadsheet from "./Demo/components/Spreadsheet";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Spreadsheet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;