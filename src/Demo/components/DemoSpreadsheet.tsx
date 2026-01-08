import React, { useRef, useState } from "react";
import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import "../../styles/DemoSpreadsheet.css";

import { MONTHS, ITEMS } from "../Data/constants";
import { createComparisonChart, rangeToA1 } from "../utils/chartUtils";

interface Props {
  onInit?: (spread: GC.Spread.Sheets.Workbook) => void;
}

const Spreadsheet: React.FC<Props> = ({ onInit }) => {
  const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [startMonth, setStartMonth] = useState(MONTHS[0]);
  const [endMonth, setEndMonth] = useState(MONTHS[MONTHS.length - 1]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemsOpen, setItemsOpen] = useState(false);

  const getMonthIndex = (month: string) => MONTHS.indexOf(month);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const generateSheet = () => {
    if (!containerRef.current) return;

    const spread =
      spreadRef.current ||
      new GC.Spread.Sheets.Workbook(containerRef.current, { sheetCount: 0 });
    spreadRef.current = spread;

    while (spread.getSheetCount() > 0) spread.removeSheet(0);

    const startIdx = getMonthIndex(startMonth);
    const endIdx = getMonthIndex(endMonth);

    if (startIdx > endIdx || selectedItems.length === 0) {
      alert("Select a valid month range and at least one item.");
      return;
    }

    const monthsSelected = MONTHS.slice(startIdx, endIdx + 1);
    const itemsCount = selectedItems.length;
    const monthsCount = monthsSelected.length;

    const sheet = new GC.Spread.Sheets.Worksheet("Sheet A");
    spread.addSheet(0, sheet);

    const GAP_ROWS = 5;

    const TABLE1_HEADER = 0;
    const TABLE1_START = TABLE1_HEADER + 1;
    const TABLE2_HEADER = TABLE1_START + itemsCount + GAP_ROWS;
    const TABLE2_START = TABLE2_HEADER + 1;

    const TABLE1_TOTAL = TABLE1_START + itemsCount;
    const TABLE2_TOTAL = TABLE2_START + itemsCount;

    sheet.setRowCount(TABLE2_TOTAL + 20);
    sheet.setColumnCount(monthsCount + 20);
    sheet.setColumnWidth(0, 150);
    /* =========================
       MINIMAL STYLES
    ========================== */

    const sectionHeaderStyle = new GC.Spread.Sheets.Style();
    sectionHeaderStyle.font = "bold 13px Segoe UI";
    // sectionHeaderStyle.backColor = "#3dcd58"
    // sectionHeaderStyle.foreColor = "#3dcd58"
    sectionHeaderStyle.hAlign =  GC.Spread.Sheets.HorizontalAlign.center;

    const columnHeaderStyle = new GC.Spread.Sheets.Style();
    columnHeaderStyle.font = "600 12px Segoe UI";
    columnHeaderStyle.backColor = "#6bd395ff";
    columnHeaderStyle.hAlign  =  GC.Spread.Sheets.HorizontalAlign.center;

    const totalRowStyle = new GC.Spread.Sheets.Style();
    totalRowStyle.font = "bold 12px Segoe UI";
    totalRowStyle.hAlign =  GC.Spread.Sheets.HorizontalAlign.center;
    // totalRowStyle.backColor = "#f6fbf8";

    /* =========================
       HEADERS
    ========================== */

    sheet.setValue(TABLE1_HEADER, 0, "In Flow");
    sheet.setValue(TABLE2_HEADER, 0, "Out Flow");

    sheet.setStyle(TABLE1_HEADER, 0, sectionHeaderStyle);
    sheet.setStyle(TABLE2_HEADER, 0, sectionHeaderStyle);

    monthsSelected.forEach((m, c) => {
      sheet.setValue(TABLE1_HEADER, c + 1, m);
      sheet.setValue(TABLE2_HEADER, c + 1, m);

      sheet.setStyle(TABLE1_HEADER, c + 1, columnHeaderStyle);
      sheet.setStyle(TABLE2_HEADER, c + 1, columnHeaderStyle);

      sheet.setColumnWidth(c + 1, 100);
    });

    /* =========================
       ROW HEADERS (ITEMS)
    ========================== */

    
    selectedItems.forEach((item, r) => {
      sheet.setValue(TABLE1_START + r, 0, item); 
      sheet.setValue(TABLE2_START + r, 0, item);
    });

    /* =========================
       TOTAL ROWS
    ========================== */

    sheet.setValue(TABLE1_TOTAL, 0, "TOTAL");
    sheet.setValue(TABLE2_TOTAL, 0, "TOTAL");

    sheet.setStyle(TABLE1_TOTAL, 0, totalRowStyle);
    sheet.setStyle(TABLE2_TOTAL, 0, totalRowStyle);

    monthsSelected.forEach((_m, c) => {
      const col = c + 1;

      sheet.setFormula(
        TABLE1_TOTAL,
        col,
        `=SUM(${rangeToA1(TABLE1_START, col, itemsCount, 1)})`
      );
      sheet.setFormula(
        TABLE2_TOTAL,
        col,
        `=SUM(${rangeToA1(TABLE2_START, col, itemsCount, 1)})`
      );

      sheet.setStyle(TABLE1_TOTAL, col, totalRowStyle);
      sheet.setStyle(TABLE2_TOTAL, col, totalRowStyle);
    });

    /* =========================
       DATA VALIDATION
    ========================== */

    const numberValidator =
      GC.Spread.Sheets.DataValidation.createNumberValidator(0, 99999, true);
    numberValidator.errorMessage("Enter a number between 0 and 99999");

    sheet.setDataValidator(
      TABLE1_START,
      1,
      itemsCount,
      monthsCount,
      numberValidator
    );
    sheet.setDataValidator(
      TABLE2_START,
      1,
      itemsCount,
      monthsCount,
      numberValidator
    );

    /* =========================
       PROTECTION
    ========================== */

    sheet.frozenRowCount(1);
    sheet.frozenColumnCount(1);

    sheet.getRange(-1, -1, -1, -1).locked(true);
    sheet.getRange(TABLE1_START, 1, itemsCount, monthsCount).locked(false);
    sheet.getRange(TABLE2_START, 1, itemsCount, monthsCount).locked(false);

    sheet.options.isProtected = true;

    /* =========================
       CHART
    ========================== */

    const updateChart = () => {
      createComparisonChart(
        sheet,
        monthsCount,
        TABLE1_START,
        itemsCount,
        TABLE2_START,
        itemsCount
      );
    };

    sheet.bind(GC.Spread.Sheets.Events.ValueChanged, updateChart);
    updateChart();

    if (onInit) onInit(spread);
  };

  return (
    <div className="spreadsheet-page">
      <div className="spreadsheet-controls">
        <div className="spreadsheet-field">
          <label>Start Month</label>
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="spreadsheet-field">
          <label>End Month</label>
          <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="items-wrapper">
          <button className="items-button" onClick={() => setItemsOpen(!itemsOpen)}>
            Items {itemsOpen ? "▲" : "▼"}
          </button>

          {itemsOpen && (
            <div className="items-dropdown">
              {ITEMS.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleItem(item)}
                    
                  />
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>

        <button className="submit-button" onClick={generateSheet}>
          Submit
        </button>
      </div>

      <div ref={containerRef} className="spreadsheet-container" />
    </div>
  );
};

export default Spreadsheet;
