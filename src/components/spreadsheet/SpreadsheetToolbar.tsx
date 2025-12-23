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
  <div className="right-toolbar">
    <p className="toolbar-title">Import / Export</p>

    <label className="import-btn">
      Import
      <input
        type="file"
        accept=".xlsx,.json"
        onChange={onImport}
        hidden
      />
    </label>

    <div className="export-wrapper">
      <button
        className="export-btn"
        onClick={() => setOpen(!open)}
      >
        Export 
      </button>

      {open && (
        <div className="export-menu">
          <div
            className="menu-item"
            onClick={() => exportToExcel(spread!)}
          >
            Export Excel (.xlsx)
          </div>
          <div
            className="menu-item"
            onClick={() => exportToJson(spread!)}
          >
            Export JSON (.json)
          </div>
        </div>
      )}
    </div>
  </div>
);

};
export default SpreadsheetToolbar;
