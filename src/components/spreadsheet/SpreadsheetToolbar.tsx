import GC from "@mescius/spread-sheets";
import React, { useState } from "react";
import {
  exportToExcel,
  exportToJson,
 
  importFromExcel,
  importFromJson,

} from "../../services/spreadsheet.service";

interface Props {
  spread: GC.Spread.Sheets.Workbook | null;
}

const SpreadsheetToolbar: React.FC<Props> = ({ spread }) => {
  const [open, setOpen] = useState(false);

  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!spread || !e.target.files?.[0]) return;

    const file = e.target.files[0];
    const ext = file.name.split(".").pop();

    if (ext === "xlsx") importFromExcel(spread, file);
    else if (ext === "json") importFromJson(spread, file);
  };

  return (
    <div style={{ display: "flex", gap: 8, padding: 8 , alignItems: "center" }}>

      <div style={{ display: "flex", flexDirection: "row" , alignItems: "center", gap: 8 }}>
        <p>You can import JSON and Excel files.</p>
        <input type="file" accept=".xlsx,.json" onChange={onImport} />
      </div>
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)}>Export ▼</button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              background: "#fff",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,.15)",
              zIndex: 100,
              minWidth: 160,
            }}
          >
            <MenuItem
              label="Export Excel (.xlsx)"
              onClick={() => exportToExcel(spread!)}
            />
            <MenuItem
              label="Export JSON (.json)"
              onClick={() => exportToJson(spread!)}
            />
            
          </div>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      padding: "8px 12px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
  >
    {label}
  </div>
);

export default SpreadsheetToolbar;
