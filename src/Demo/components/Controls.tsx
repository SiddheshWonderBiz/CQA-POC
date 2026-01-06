// import React from "react";
// import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";

// interface Props {
//   startMonth: string;
//   endMonth: string;
//   items: string[];
//   selectionType: SelectionType | "";
//   onChange: (key: string, value: any) => void;
//   onSubmit: () => void;
// }

// export const Controls: React.FC<Props> = ({
// //   startMonth,
// //   endMonth,
// //   items,
// //   selectionType,
//   onChange,
//   onSubmit
// }) => {
//   return (
//     <div style={{ marginBottom: 12 }}>
//       <select onChange={e => onChange("startMonth", e.target.value)}>
//         <option value="">Start Month</option>
//         {MONTHS.map(m => <option key={m}>{m}</option>)}
//       </select>

//       <select onChange={e => onChange("endMonth", e.target.value)}>
//         <option value="">End Month</option>
//         {MONTHS.map(m => <option key={m}>{m}</option>)}
//       </select>

//       <select
//         multiple
//         onChange={e =>
//           onChange(
//             "items",
//             [...e.target.selectedOptions].map(o => o.value)
//           )
//         }
//       >
//         {ITEMS.map(i => <option key={i}>{i}</option>)}
//       </select>

//       <select onChange={e => onChange("selectionType", e.target.value)}>
//         <option value="">Selection Type</option>
//         {SELECTION_TYPES.map(t => (
//           <option key={t.value} value={t.value}>{t.label}</option>
//         ))}
//       </select>

//       <button onClick={onSubmit}>Generate Sheets</button>
//     </div>
//   );
// };



// import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";
// import Spreadsheet from "./Spreadsheet";
// import React, { useRef, useState } from "react";


// // interface Props {
// //   startMonth: string;
// //   endMonth: string;
// //   items: string[];
// //   selectionType: SelectionType | "";
// //   onChange: (key: string, value: any) => void;
// //   onSubmit: () => void;
// // }

//     export const Controls: React.FC<Props> = ({
//      const [startMonth, setStartMonth] = useState(MONTHS[0]),
//      const [endMonth, setEndMonth] = useState(MONTHS[MONTHS.length - 1]),
//      const [selectedItems, setSelectedItems] = useState<string[]>([]),
//      const [selectionType, setSelectionType] = useState<SelectionType>("value"),
//      const [itemsOpen, setItemsOpen] = useState(false)
//     }) => {
//   return (
//     <div>
//           <div style={{ marginBottom: 20 }}>
//             <label>
//               Start Month:
//               <select value={startMonth} onChange={e => setStartMonth(e.target.value)}>
//                 {MONTHS.map(m => <option key={m}>{m}</option>)}
//               </select>
//             </label>
    
//             <label style={{ marginLeft: 20 }}>
//               End Month:
//               <select value={endMonth} onChange={e => setEndMonth(e.target.value)}>
//                 {MONTHS.map(m => <option key={m}>{m}</option>)}
//               </select>
//             </label>
    
//             <div style={{ display: "inline-block", marginLeft: 20 }}>
//               <button onClick={() => setItemsOpen(!itemsOpen)}>Items {itemsOpen ? "▲" : "▼"}</button>
//               {itemsOpen && (
//                 <div style={{
//                   border: "1px solid #ccc",
//                   padding: 10,
//                   background: "#fff",
//                   position: "absolute",
//                   zIndex: 10,
//                 }}>
//                   {ITEMS.map(item => (
//                     <label key={item} style={{ display: "block" }}>
//                       <input type="checkbox"
//                         checked={selectedItems.includes(item)}
//                         onChange={() => toggleItem(item)}
//                       /> {item}
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
    
//             <label style={{ marginLeft: 20 }}>
//               Selection Type:
//               <select
//                 value={selectionType}
//                 onChange={e => setSelectionType(e.target.value as SelectionType)}
//               >
//                 {SELECTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
//               </select>
//             </label>
    
//             <button style={{ marginLeft: 20 }} onClick={generateSheet}>Submit</button>
//           </div>
    
//           <div ref={containerRef} style={{ width: "100%", height: "600px", border: "1px solid #ccc" }} />
//         </div>
//   );
// };