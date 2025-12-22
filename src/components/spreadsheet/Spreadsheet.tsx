import GC from '@mescius/spread-sheets'
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react'
import React, { useRef } from 'react'
import SpreadsheetToolbar from './SpreadsheetToolbar'

const Spreadsheet : React.FC = () => {

const [spread, setSpread] = React.useState<GC.Spread.Sheets.Workbook | null>(null);

const onInit = (workbook: GC.Spread.Sheets.Workbook) => {
  setSpread(workbook);

  const sheet = workbook.getActiveSheet();
  sheet.name("Calculation Sheet");
  sheet.setValue(0, 0, "Addition:");
  sheet.setValue(1, 0, 10);
  sheet.setValue(2, 0, 20);
  sheet.setFormula(3, 0, "=SUM(A2:A3)");
};

  return (
    <div>
        <SpreadsheetToolbar spread={spread} />
        <SpreadSheets
            hostStyle={{ width: '100vw', height: '100vh' }}
            workbookInitialized={onInit}
        >
        <Worksheet />
        </SpreadSheets>

    </div>
  )
}

export default Spreadsheet