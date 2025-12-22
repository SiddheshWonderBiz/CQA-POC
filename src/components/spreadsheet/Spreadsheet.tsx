import GC from "@mescius/spread-sheets";
import { SpreadSheets, Worksheet } from "@mescius/spread-sheets-react";
import React from "react";
import SpreadsheetToolbar from "./SpreadsheetToolbar";

const Spreadsheet: React.FC = () => {
  const [spread, setSpread] = React.useState<GC.Spread.Sheets.Workbook | null>(
    null
  );

  const onInit = (spread: GC.Spread.Sheets.Workbook) => {
    setSpread(spread);

    const sheet = spread.getActiveSheet();
    sheet.name("Sales Sheet");

    const headers = [
      "Item",
      "Quantity",
      "Unit Price",
      "Cost",
      "Total Price",
      "Discount",
      "Net Price",
      "Profit",
      "Loss",
    ];

    const items = [
      ["Apple", 10, 50, 40, null, 10],
      ["Banana", 20, 30, 25, null, 5],
      ["Orange", 15, 40, 30, null, 8],
      ["Mango", 12, 60, 50, null, 12],
      ["Grapes", 18, 70, 55, null, 15],
    ];

    // Headers
    sheet.setArray(0, 0, [headers]);

    // Table
    const table = sheet.tables.add(
      "SalesTable",
      0,
      0,
      items.length + 1,
      headers.length
    );
    table.showHeader(true);
    table.filterButtonVisible(true);
    table.style("TableStyleMedium2");

    // Data
    items.forEach((row, i) => {
      sheet.setArray(i + 1, 0, [row]);
    });

    // Formulas
    for (let i = 0; i < items.length; i++) {
      const r = i + 1;
      sheet.setFormula(r, 4, `=B${r + 1}*C${r + 1}`);
      sheet.setFormula(r, 6, `=E${r + 1}-F${r + 1}`);
      sheet.setFormula(
        r,
        7,
        `=MAX(0, G${r + 1}-(B${r + 1}*D${r + 1}))`
      );
      sheet.setFormula(
        r,
        8,
        `=MAX(0, (B${r + 1}*D${r + 1})-G${r + 1})`
      );
    }

    // Locking
    sheet.getRange(1, 0, items.length, 4).locked(false); // Editable
    sheet.getRange(1, 4, items.length, 5).locked(true);  // Calculated

    // 🔥 IMPORTANT: header MUST be unlocked
    sheet.getRange(0, 0, 1, headers.length).locked(false);

    // Protection
    sheet.options.protectionOptions = {
      allowSelectLockedCells: false,
      allowResizeColumns: true,
      allowResizeRows: true,
      allowSort: true,
      allowFilter: true,
    };

    sheet.protect("");

    // Auto fit
    for (let c = 0; c < headers.length; c++) {
      sheet.autoFitColumn(c);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <SpreadsheetToolbar spread={spread} />
      <div style={{ flex: 1 }}>
        <SpreadSheets
          hostStyle={{  height: "600px" }}
          workbookInitialized={onInit}
        >
          <Worksheet />
        </SpreadSheets>
      </div>
    </div>
  );
};

export default Spreadsheet;
