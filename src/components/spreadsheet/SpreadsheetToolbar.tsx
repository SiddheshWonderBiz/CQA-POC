import GC from '@mescius/spread-sheets'
import React from 'react'
import { exportToExcel, importFromExcel } from '../../services/spreadsheet.service'


interface Props{
    spread : GC.Spread.Sheets.Workbook | null
}

const SpreadsheetToolbar: React.FC<Props> = ({ spread }) => {

    const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && spread) {
            const file = e.target.files[0];
            importFromExcel(spread, file);
        }
    }

    const onExport = () => {
        if (spread) {
            // Call the export function from the service
            exportToExcel(spread);
        }
    }



  return (
    <div style={{padding : '8px'}}>
        <input type="file" accept=".xlsx" onChange={onImport} />
        <button onClick={onExport}> Export Excel</button>
    </div>
  )
}

export default SpreadsheetToolbar