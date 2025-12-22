import GC from '@mescius/spread-sheets'
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react'
import React, { useRef } from 'react'

const Spreadsheet : React.FC = () => {

 const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null)
 const onInit = (spread: GC.Spread.Sheets.Workbook) => {
    spreadRef.current = spread
    const sheet = spread.getActiveSheet()
    sheet.name('Calculation Sheet')


    sheet.setValue(0, 0, 'Addition:')
    sheet.setValue(1, 0, 10)
    sheet.setValue(2, 0, 20)
    sheet.setFormula(3,0,'=SUM(A2:A3)')
 }
  return (
    <div>
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