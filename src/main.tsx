import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
import '@mescius/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
