import GC from "@mescius/spread-sheets";
import { SpreadSheets, Worksheet } from "@mescius/spread-sheets-react";
import { setupBlankSheet } from "./sheets/blankSheet";
import { setupCalculationSheet } from "./sheets/calculationSheet";
import { setupGraphSheet } from "./sheets/graphSheet";
import React from "react";
import SpreadsheetToolbar from "./SpreadsheetToolbar";
import "../../styles/Spreadsheet.css";

const Spreadsheet = () => {
  const [spread, setSpread] = React.useState<GC.Spread.Sheets.Workbook | null>(
    null
  );
  const onInit = (spread: GC.Spread.Sheets.Workbook) => {
    setSpread(spread);
    spread.suspendPaint();

    spread.addSheet(0, new GC.Spread.Sheets.Worksheet("Blank"));
    setupBlankSheet(spread.getSheet(0)!);

    spread.addSheet(1, new GC.Spread.Sheets.Worksheet("Calculation"));
    setupCalculationSheet(spread.getSheet(1)!);

    spread.addSheet(2, new GC.Spread.Sheets.Worksheet("Graph"));
    setupGraphSheet(spread.getSheet(2)!);

    spread.setActiveSheetIndex(0);
    spread.resumePaint();
  };

  return (
    <>
    <div className="spread-container">
      <SpreadsheetToolbar spread={spread} />
      <div className="spread-area">
      <SpreadSheets
        workbookInitialized={onInit}
        hostStyle={{ height: "600px" }}
      >
        <Worksheet />
      </SpreadSheets>
      </div>
      </div>
    </>
  );
};

export default Spreadsheet;
