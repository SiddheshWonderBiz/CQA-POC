// import React, { useRef } from "react";
// import * as GC from "@mescius/spread-sheets";
// import { SpreadSheets } from "@mescius/spread-sheets-react";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
// import "@mescius/spread-sheets-charts";

// interface Props {
//   onInit: (spread: GC.Spread.Sheets.Workbook) => void;
// }

// export const Spreadsheet: React.FC<Props> = ({ onInit }) => (
//   <div style={{ width: "100%", height: "600px" }}>
//     <SpreadSheets
//       workbookInitialized={onInit}
//     />
//   </div> 
// );

// import React, { useEffect, useRef } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// interface Props {
//   monthsCount?: number;
//   itemsCount?: number;
//   onInit?: (spread: GC.Spread.Sheets.Workbook) => void;
// }

// const Spreadsheet: React.FC<Props> = ({ monthsCount = 24, itemsCount = 5, onInit }) => {
//   const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current && !spreadRef.current) {
//       const spread = new GC.Spread.Sheets.Workbook(containerRef.current, {
//         sheetCount: 2
//       });
//       spreadRef.current = spread;

//       if (onInit) onInit(spread);
//     }
//   }, [onInit]);

//   return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
// };

// export default Spreadsheet;



// import React, { useEffect, useRef } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// interface Props {
//   monthsCount?: number;
//   itemsCount?: number;
//   onInit?: (spread: GC.Spread.Sheets.Workbook) => void;
// }

// const Spreadsheet: React.FC<Props> = ({
//   monthsCount = 24,
//   itemsCount = 5,
//   onInit,
// }) => {
//   const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current && !spreadRef.current) {
//       const spread = new GC.Spread.Sheets.Workbook(containerRef.current, {
//         sheetCount: 0,
//       });
//       spreadRef.current = spread;

//       const getMonthName = (index: number) => {
//         const date = new Date(2026, index, 1);
//         return date.toLocaleString("default", { month: "short", year: "numeric" });
//       };

//       const items = ["Software", "Hardware", "Branded Products", "Laptop", "CPU"];

//       // Create Sheet A & Sheet B
//       ["Sheet A", "Sheet B"].forEach((sheetName) => {
//         const sheet = new GC.Spread.Sheets.Worksheet(sheetName);
//         spread.addSheet(spread.getSheetCount(), sheet);

//         // Column headers
//         for (let col = 0; col < monthsCount; col++) {
//           sheet.setValue(0, col + 1, getMonthName(col));
//           sheet.setColumnWidth(col + 1, 100);
//         }

//         // Row headers (items)
//         for (let row = 0; row < itemsCount; row++) {
//           sheet.setValue(row + 1, 0, items[row] || `Item ${row + 1}`);
//         }

//         sheet.setColumnWidth(0, 150);
//       });

//       if (onInit) onInit(spread);
//     }
//   }, [monthsCount, itemsCount, onInit]);

//   return <div ref={containerRef} style={{ width: "100%", height: "600px" }} />;
// };

// export default Spreadsheet;




// import React, { useEffect, useRef, useState } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// interface Props {
//   onInit?: (spread: GC.Spread.Sheets.Workbook) => void;
// }

// const monthsArray = [
//   "Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026",
//   "Jul 2026","Aug 2026","Sep 2026","Oct 2026","Nov 2026","Dec 2026",
//   "Jan 2027","Feb 2027","Mar 2027","Apr 2027","May 2027","Jun 2027",
//   "Jul 2027","Aug 2027","Sep 2027","Oct 2027","Nov 2027","Dec 2027"
// ];

// const itemsArray = ["Software", "Hardware", "Branded Products", "Laptop", "CPU"];

// const selectionTypes = ["By Value", "By Reference"];

// const Spreadsheet: React.FC<Props> = ({ onInit }) => {
//   const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [startMonth, setStartMonth] = useState(monthsArray[0]);
//   const [endMonth, setEndMonth] = useState(monthsArray[monthsArray.length-1]);
//   const [selectedItems, setSelectedItems] = useState<string[]>([...itemsArray]);
//   const [selectionType, setSelectionType] = useState(selectionTypes[0]);

//   const getMonthIndex = (month: string) => monthsArray.indexOf(month);

//   const generateSheets = () => {
//     if (!containerRef.current) return;

//     const spread = spreadRef.current || new GC.Spread.Sheets.Workbook(containerRef.current, { sheetCount: 0 });
//     spreadRef.current = spread;

//     // Clear existing sheets
//     while (spread.getSheetCount() > 0) {
//       spread.removeSheet(0);
//     }

//     const startIdx = getMonthIndex(startMonth);
//     const endIdx = getMonthIndex(endMonth);
//     const monthsCount = endIdx - startIdx + 1;
//     const itemsCount = selectedItems.length;

//     const monthsSelected = monthsArray.slice(startIdx, endIdx + 1);

//     ["Sheet A", "Sheet B"].forEach((sheetName) => {
//       const sheet = new GC.Spread.Sheets.Worksheet(sheetName);
//       spread.addSheet(spread.getSheetCount(), sheet);

//       // Add column headers (months)
//       monthsSelected.forEach((month, col) => {
//         sheet.setValue(0, col + 1, month); // Column 0 = items
//         sheet.setColumnWidth(col + 1, 100);
//       });

//       // Add row headers (items)
//       selectedItems.forEach((item, row) => {
//         sheet.setValue(row + 1, 0, item);
//       });

//       sheet.setColumnWidth(0, 150);
//     });

//     if (onInit) onInit(spread);
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: 20 }}>
//         <label>
//           Start Month:
//           <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
//             {monthsArray.map((m) => <option key={m}>{m}</option>)}
//           </select>
//         </label>

//         <label style={{ marginLeft: 20 }}>
//           End Month:
//           <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
//             {monthsArray.map((m) => <option key={m}>{m}</option>)}
//           </select>
//         </label>

//         <label style={{ marginLeft: 20 }}>
//         Items:
//         <select multiple value={selectedItems}
//           size={itemsArray.length}style={{ minWidth: 180 }} onChange={(e) => {       
//             const values = Array.from(e.target.selectedOptions,(option) => option.value);
//             setSelectedItems(values);
//           }}
//   >         {itemsArray.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </label>
        
//         {/* <label style={{ marginLeft: 20 }}>
//           Items:
//           <select multiple value={selectedItems} onChange={(e) => {
//             const options = Array.from(e.target.selectedOptions, option => option.value);
//             setSelectedItems(options);
//           }}>
//             {itemsArray.map((item) => <option key={item}>{item}</option>)}
//           </select>
//         </label> */}

//         <label style={{ marginLeft: 20 }}>
//           Selection Type:
//           <select value={selectionType} onChange={(e) => setSelectionType(e.target.value)}>
//             {selectionTypes.map((t) => <option key={t}>{t}</option>)}
//           </select>
//         </label>

//         <button style={{ marginLeft: 20 }} onClick={generateSheets}>Submit</button>
//       </div>

//       <div ref={containerRef} style={{ width: "100%", height: "600px" }} />
//     </div>
//   );
// };

// export default Spreadsheet;






// import React, { useRef, useState } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";



// import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";


// interface Props {
//   onInit?: (spread: GC.Spread.Sheets.Workbook) => void;
// }

// const Spreadsheet: React.FC<Props> = ({ onInit }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);

//   const [startMonth, setStartMonth] = useState(MONTHS[0]);
//   const [endMonth, setEndMonth] = useState(MONTHS[MONTHS.length - 1]);
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [selectionType, setSelectionType] =
//     useState<SelectionType>("value");

//   const toggleItem = (item: string) => {
//     setSelectedItems(prev =>
//       prev.includes(item)
//         ? prev.filter(i => i !== item)
//         : [...prev, item]
//     );
//   };

//   const generateSheets = () => {
//     if (!containerRef.current) return;

//     const startIdx = MONTHS.indexOf(startMonth);
//     const endIdx = MONTHS.indexOf(endMonth);

//     if (startIdx > endIdx || selectedItems.length === 0) {
//       alert("Please select valid months and at least one item.");
//       return;
//     }

//     const monthsSelected = MONTHS.slice(startIdx, endIdx + 1);

//     const spread =
//       spreadRef.current ??
//       new GC.Spread.Sheets.Workbook(containerRef.current, {
//         sheetCount: 0
//       });

//     spreadRef.current = spread;

//     // Clear existing sheets
//     while (spread.getSheetCount() > 0) {
//       spread.removeSheet(0);
//     }

//     ["Sheet A", "Sheet B"].forEach(sheetName => {
//       const sheet = new GC.Spread.Sheets.Worksheet(sheetName);
//       spread.addSheet(spread.getSheetCount(), sheet);

//       // Month headers
//       monthsSelected.forEach((month, col) => {
//         sheet.setValue(0, col + 1, month);
//         sheet.setColumnWidth(col + 1, 100);
//       });

//       // Item headers
//       selectedItems.forEach((item, row) => {
//         sheet.setValue(row + 1, 0, item);
//       });

//       sheet.setColumnWidth(0, 160);
//     });

//     // (Selection type hook — logic can be expanded later)
//     console.log("Selection Type:", selectionType);

//     onInit?.(spread);
//   };

//   return (
//     <div>
//       {/* CONTROLS */}
//       <div
//         style={{
//           display: "flex",
//           gap: 24,
//           alignItems: "flex-start",
//           marginBottom: 20,
//           flexWrap: "wrap"
//         }}
//       >
//         {/* Start Month */}
//         <label>
//           Start Month
//           <br />
//           <select
//             value={startMonth}
//             onChange={e => setStartMonth(e.target.value)}
//           >
//             {MONTHS.map(m => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//           </select>
//         </label>

//         {/* End Month */}
//         <label>
//           End Month
//           <br />
//           <select
//             value={endMonth}
//             onChange={e => setEndMonth(e.target.value)}
//           >
//             {MONTHS.map(m => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//           </select>
//         </label>

//         {/* Items (Checkboxes) */}
//         <fieldset style={{ border: "1px solid #ccc", padding: 10 }}>
//           <legend>Items</legend>
//           {ITEMS.map(item => (
//             <label key={item} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 checked={selectedItems.includes(item)}
//                 onChange={() => toggleItem(item)}
//               />
//               {item}
//             </label>
//           ))}
//         </fieldset>

//         {/* Selection Type */}
//         <label>
//           Selection Type
//           <br />
//           <select
//             value={selectionType}
//             onChange={e =>
//               setSelectionType(e.target.value as SelectionType)
//             }
//           >
//             {SELECTION_TYPES.map(t => (
//               <option key={t.value} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//         </label>

//         {/* Submit */}
//         <button onClick={generateSheets} style={{ height: 32 }}>
//           Submit
//         </button>
//       </div>

//       {/* SPREAD */}
//       <div
//         ref={containerRef}
//         style={{ width: "100%", height: "600px" }}
//       />
//     </div>
//   );
// };

// export default Spreadsheet;










// import React, { useRef } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// import { MONTHS, ITEMS } from "../Data/constants";
// import { createComparisonChart } from "../utils/chartUtils";

// const Spreadsheet: React.FC = () => {
//   const sheetARef = useRef<HTMLDivElement>(null);
//   const sheetBRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);

//   const sheetASpread = useRef<GC.Spread.Sheets.Workbook>();
//   const sheetBSpread = useRef<GC.Spread.Sheets.Workbook>();
//   const chartSpread = useRef<GC.Spread.Sheets.Workbook>();

//   const generate = () => {
//     if (!sheetARef.current || !sheetBRef.current || !chartRef.current) return;

//     sheetASpread.current = new GC.Spread.Sheets.Workbook(sheetARef.current);
//     sheetBSpread.current = new GC.Spread.Sheets.Workbook(sheetBRef.current);
//     chartSpread.current = new GC.Spread.Sheets.Workbook(chartRef.current);

//     const sheetA = new GC.Spread.Sheets.Worksheet("Sheet A");
//     const sheetB = new GC.Spread.Sheets.Worksheet("Sheet B");

//     sheetASpread.current.addSheet(0, sheetA);
//     sheetBSpread.current.addSheet(0, sheetB);

//     MONTHS.forEach((m, c) => {
//       sheetA.setValue(0, c + 1, m);
//       sheetB.setValue(0, c + 1, m);
//     });

//     ITEMS.forEach((item, r) => {
//       sheetA.setValue(r + 1, 0, item);
//       sheetB.setValue(r + 1, 0, item);
//     });

//     // Auto-update chart when data changes
//     const updateChart = () =>
//       createComparisonChart(
//         chartSpread.current!,
//         sheetA,
//         sheetB,
//         MONTHS.length,
//         ITEMS.length
//       );

//     sheetA.bind(GC.Spread.Sheets.Events.ValueChanged, updateChart);
//     sheetB.bind(GC.Spread.Sheets.Events.ValueChanged, updateChart);

//     updateChart();
//   };

//   return (
//     <div>
//       <button onClick={generate}>Generate</button>

//       <h3>Sheet A</h3>
//       <div ref={sheetARef} style={{ height: 300 }} />

//       <h3>Sheet B</h3>
//       <div ref={sheetBRef} style={{ height: 300 }} />

//       <h3>Comparison Chart</h3>
//       <div ref={chartRef} style={{ height: 450 }} />
//     </div>
//   );
// };

// export default Spreadsheet;




// import React, { useRef, useState, useEffect } from "react";
// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

// import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";
// import { createComparisonChart } from "../utils/chartUtils";

// const Spreadsheet: React.FC = () => {
//   // DOM refs
//   const sheetARef = useRef<HTMLDivElement>(null);
//   const sheetBRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);

//   // Workbook refs (created ONCE)
//   const sheetASpread = useRef<GC.Spread.Sheets.Workbook | null>(null);
//   const sheetBSpread = useRef<GC.Spread.Sheets.Workbook | null>(null);
//   const chartSpread = useRef<GC.Spread.Sheets.Workbook | null>(null);

//   // UI state
//   const [startMonth, setStartMonth] = useState(MONTHS[0]);
//   const [endMonth, setEndMonth] = useState(MONTHS[MONTHS.length - 1]);
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [selectionType, setSelectionType] = useState<SelectionType>("value");

//   /** ✅ Create workbooks ONCE */
//   useEffect(() => {
//     if (sheetARef.current && !sheetASpread.current) {
//       sheetASpread.current = new GC.Spread.Sheets.Workbook(sheetARef.current);
//       sheetASpread.current.addSheet(0, new GC.Spread.Sheets.Worksheet("Sheet A"));
//     }

//     if (sheetBRef.current && !sheetBSpread.current) {
//       sheetBSpread.current = new GC.Spread.Sheets.Workbook(sheetBRef.current);
//       sheetBSpread.current.addSheet(0, new GC.Spread.Sheets.Worksheet("Sheet B"));
//     }

//     if (chartRef.current && !chartSpread.current) {
//       chartSpread.current = new GC.Spread.Sheets.Workbook(chartRef.current);
//     }
//   }, []);

//   const toggleItem = (item: string) => {
//     setSelectedItems(prev =>
//       prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
//     );
//   };

//   /** ✅ Only update sheet content on Submit */
//   const generate = () => {
//     if (
//       !sheetASpread.current ||
//       !sheetBSpread.current ||
//       !chartSpread.current
//     )
//       return;

//     const startIdx = MONTHS.indexOf(startMonth);
//     const endIdx = MONTHS.indexOf(endMonth);

//     if (startIdx > endIdx || selectedItems.length === 0) {
//       alert("Invalid selection");
//       return;
//     }

//     const months = MONTHS.slice(startIdx, endIdx + 1);

//     const sheetA = sheetASpread.current.getSheet(0)!;
//     const sheetB = sheetBSpread.current.getSheet(0)!;

//     sheetA.clear(0, 0, sheetA.getRowCount(), sheetA.getColumnCount());
//     sheetB.clear(0, 0, sheetB.getRowCount(), sheetB.getColumnCount());

//     // Headers
//     months.forEach((m, c) => {
//       sheetA.setValue(0, c + 1, m);
//       sheetB.setValue(0, c + 1, m);
//     });

//     selectedItems.forEach((item, r) => {
//       sheetA.setValue(r + 1, 0, item);
//       sheetB.setValue(r + 1, 0, item);
//     });

//     // Chart update
//     createComparisonChart(
//       chartSpread.current,
//       sheetA,
//       sheetB,
//       months.length,
//       selectedItems.length
//     );
//   };

//   return (
//     <div>
//       {/* ✅ CONTROLS (never touched by SpreadJS) */}
//       <div style={{ marginBottom: 20 }}>
//         <label>
//           Start Month:
//           <select value={startMonth} onChange={e => setStartMonth(e.target.value)}>
//             {MONTHS.map(m => (
//               <option key={m}>{m}</option>
//             ))}
//           </select>
//         </label>

//         <label style={{ marginLeft: 20 }}>
//           End Month:
//           <select value={endMonth} onChange={e => setEndMonth(e.target.value)}>
//             {MONTHS.map(m => (
//               <option key={m}>{m}</option>
//             ))}
//           </select>
//         </label>

//         <fieldset style={{ display: "inline-block", marginLeft: 20 }}>
//           <legend>Items</legend>
//           {ITEMS.map(item => (
//             <label key={item} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 checked={selectedItems.includes(item)}
//                 onChange={() => toggleItem(item)}
//               />
//               {item}
//             </label>
//           ))}
//         </fieldset>

//         <label style={{ marginLeft: 20 }}>
//           Selection Type:
//           <select
//             value={selectionType}
//             onChange={e => setSelectionType(e.target.value as SelectionType)}
//           >
//             {SELECTION_TYPES.map(t => (
//               <option key={t.value} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button onClick={generate} style={{ marginLeft: 20 }}>
//           Submit
//         </button>
//       </div>

//       {/* ✅ SPREADSHEETS */}
//       <h3>Sheet A</h3>
//       <div ref={sheetARef} style={{ height: 300 }} />

//       <h3>Sheet B</h3>
//       <div ref={sheetBRef} style={{ height: 300 }} />

//       <h3>Comparison Chart</h3>
//       <div ref={chartRef} style={{ height: 450 }} />
//     </div>
//   );
// };

// export default Spreadsheet;



import React, { useRef, useState, useEffect } from "react";
import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

import {
  MONTHS,
  ITEMS,
  SELECTION_TYPES,
  SelectionType
} from "../Data/constants";

import { createComparisonChart } from "../utils/chartUtils";

const Spreadsheet: React.FC = () => {
  // DOM refs
  const sheetARef = useRef<HTMLDivElement | null>(null);
  const sheetBRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  // Workbook refs (created ONCE)
  const sheetASpread = useRef<GC.Spread.Sheets.Workbook | null>(null);
  const sheetBSpread = useRef<GC.Spread.Sheets.Workbook | null>(null);
  const chartSpread = useRef<GC.Spread.Sheets.Workbook | null>(null);

  // UI state
  const [startMonth, setStartMonth] = useState<string>(MONTHS[0]);
  const [endMonth, setEndMonth] = useState<string>(
    MONTHS[MONTHS.length - 1]
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionType, setSelectionType] =
    useState<SelectionType>("value");

  /** ✅ Create workbooks ONCE */
  useEffect(() => {
    if (sheetARef.current && !sheetASpread.current) {
      sheetASpread.current = new GC.Spread.Sheets.Workbook(sheetARef.current);
      sheetASpread.current.addSheet(
        0,
        new GC.Spread.Sheets.Worksheet("Sheet A")
      );
    }

    if (sheetBRef.current && !sheetBSpread.current) {
      sheetBSpread.current = new GC.Spread.Sheets.Workbook(sheetBRef.current);
      sheetBSpread.current.addSheet(
        0,
        new GC.Spread.Sheets.Worksheet("Sheet B")
      );
    }

    if (chartRef.current && !chartSpread.current) {
      chartSpread.current = new GC.Spread.Sheets.Workbook(chartRef.current);
    }
  }, []);

  const toggleItem = (item: string): void => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  /** ✅ Update sheets + chart on Submit */
  const generate = (): void => {
    if (
      !sheetASpread.current ||
      !sheetBSpread.current ||
      !chartSpread.current
    ) {
      return;
    }

    const startIdx = MONTHS.indexOf(startMonth);
    const endIdx = MONTHS.indexOf(endMonth);

    if (startIdx > endIdx || selectedItems.length === 0) {
      alert("Please select valid months and at least one item.");
      return;
    }

    const months = MONTHS.slice(startIdx, endIdx + 1);

    const sheetA = sheetASpread.current.getSheet(0)!;
    const sheetB = sheetBSpread.current.getSheet(0)!;

    // ✅ FIXED: clear requires SheetArea
    sheetA.clear(
      0,
      0,
      sheetA.getRowCount(selectedItems.length + 1),
      sheetA.getColumnCount(),
      GC.Spread.Sheets.SheetArea.viewport,
      GC.Spread.Sheets.StorageType.data
    );

    sheetB.clear(
      0,
      0,
      sheetB.getRowCount(selectedItems.length + 1),
      sheetB.getColumnCount(),
      GC.Spread.Sheets.SheetArea.viewport,
      GC.Spread.Sheets.StorageType.data
    );

    // Headers
    months.forEach((month: string, col: number) => {
      sheetA.setValue(0, col + 1, month);
      sheetB.setValue(0, col + 1, month);
    });

    selectedItems.forEach((item: string, row: number) => {
      sheetA.setValue(row + 1, 0, item);
      sheetB.setValue(row + 1, 0, item);
    });

    // Create / refresh chart
    createComparisonChart(
      chartSpread.current,
      sheetA,
      sheetB,
      months.length,
      selectedItems.length
    );

    console.log("Selection Type:", selectionType);
  };

  return (
    <div>
      {/* CONTROLS */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Start Month:
          <select
            value={startMonth}
            onChange={e => setStartMonth(e.target.value)}
          >
            {MONTHS.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          End Month:
          <select
            value={endMonth}
            onChange={e => setEndMonth(e.target.value)}
          >
            {MONTHS.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <fieldset style={{ display: "inline-block", marginLeft: 20 }}>
          <legend>Items</legend>
          {ITEMS.map(item => (
            <label key={item} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => toggleItem(item)}
              />
              {item}
            </label>
          ))}
        </fieldset>

        <label style={{ marginLeft: 20 }}>
          Selection Type:
          <select
            value={selectionType}
            onChange={e =>
              setSelectionType(e.target.value as SelectionType)
            }
          >
            {SELECTION_TYPES.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <button onClick={generate} style={{ marginLeft: 20 }}>
          Submit
        </button>
      </div>

      {/* WORKBOOKS STACKED */}
      <h3>Sheet A</h3>
      <div ref={sheetARef} style={{ height: 300 }} />

      <h3>Sheet B</h3>
      <div ref={sheetBRef} style={{ height: 300 }} />

      <h3>Comparison Chart</h3>
      <div ref={chartRef} style={{ height: 450 }} />
    </div>
  );
};

export default Spreadsheet;
