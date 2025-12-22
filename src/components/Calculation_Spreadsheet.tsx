import React, { useEffect, useRef } from 'react'
import * as GC from '@mescius/spread-sheets'
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react'

const Spreadsheet: React.FC = () => {
  const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null)

  // Called when SpreadJS is ready
  const onWorkbookInitialized = (spread: GC.Spread.Sheets.Workbook) => {
    spreadRef.current = spread

    const sheet = spread.getActiveSheet()
    sheet.setValue(0, 0, 'Hello SpreadJS')
    sheet.setValue(1, 0, 'React 17 + TypeScript')
  }

return (
  <div style={{ width: '100%', height: '100%' }}>
    <SpreadSheets
      workbookInitialized={onWorkbookInitialized}
      // style={{ width: '100%', height: '100%' }}
      hostStyle={{ width: '800px', height: '800px' }}
    >
      <Worksheet />
    </SpreadSheets>
  </div>
)

}

export default Spreadsheet
