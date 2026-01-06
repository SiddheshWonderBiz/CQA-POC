import React, { useRef, useState } from "react";
import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css";

import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";
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
  const [selectionType, setSelectionType] = useState<SelectionType>("value");
  const [itemsOpen, setItemsOpen] = useState(false);

  const getMonthIndex = (month: string) => MONTHS.indexOf(month);

  const toggleItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
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

    // Row indices
    const TABLE1_HEADER = 0; 
    const TABLE1_START = TABLE1_HEADER + 1;
    const TABLE2_HEADER = TABLE1_START + itemsCount + GAP_ROWS;
    const TABLE2_START = TABLE2_HEADER + 1; 

    const TABLE1_TOTAL = TABLE1_START + itemsCount;
    const TABLE2_TOTAL = TABLE2_START + itemsCount;

    sheet.setRowCount(TABLE2_TOTAL + 20);
    sheet.setColumnCount(monthsCount + 5);

    sheet.setValue(TABLE1_HEADER, 0, "In Flow");
    monthsSelected.forEach((m, c) => {
      sheet.setValue(TABLE1_HEADER, c + 1, m);
      sheet.setColumnWidth(c + 1, 100);
    });

    sheet.setValue(TABLE2_HEADER, 0, "Out Flow");
    monthsSelected.forEach((m, c) => {
      sheet.setValue(TABLE2_HEADER, c + 1, m);
      sheet.setColumnWidth(c + 1, 100);
    });

    // Item names
    selectedItems.forEach((item, r) => {
      sheet.setValue(TABLE1_START + r, 0, item);
      sheet.setValue(TABLE2_START + r, 0, item);
    });

    // TOTAL labels
    sheet.setValue(TABLE1_TOTAL, 0, "TOTAL");
    sheet.setValue(TABLE2_TOTAL, 0, "TOTAL");

    // Initial values
    selectedItems.forEach((_i, r) => {
      monthsSelected.forEach((_m, c) => {
        const col = c + 1;
        sheet.setValue(TABLE1_START + r, col, "");
        sheet.setValue(TABLE2_START + r, col, "");
      });
    });
    // Total formulas
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
    });

    // Data Validation
    const numberValidator = GC.Spread.Sheets.DataValidation.createNumberValidator(0, 99999, true);
    numberValidator.errorMessage("Enter a number between 0 and 99999");

    sheet.setDataValidator(TABLE1_START, 1, itemsCount, monthsCount, numberValidator);
    sheet.setDataValidator(TABLE2_START, 1, itemsCount, monthsCount, numberValidator);


    sheet.frozenRowCount(1);
    sheet.frozenColumnCount(1);

    sheet.getRange(-1, -1, -1, -1).locked(true);
    sheet.getRange(TABLE1_START, 1, itemsCount, monthsCount).locked(false);
    sheet.getRange(TABLE2_START, 1, itemsCount, monthsCount).locked(false);

    sheet.options.isProtected = true;

    //For ref
    sheet.bind(GC.Spread.Sheets.Events.DragFillBlock, (_s: any, args: { cancel: boolean }) => {
      if (selectionType === "ref") args.cancel = true;
    });

    sheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, (_s: any, args: { cancel: boolean }) => {
      if (selectionType === "ref") args.cancel = true;
    });

    //chart
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
    <div>
      <div style={{ marginBottom: 20 }}>
        <label>
          Start Month:
          <select value={startMonth} onChange={e => setStartMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          End Month:
          <select value={endMonth} onChange={e => setEndMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
        </label>

        <div style={{ display: "inline-block", marginLeft: 20 }}>
          <button onClick={() => setItemsOpen(!itemsOpen)}>Items {itemsOpen ? "▲" : "▼"}</button>
          {itemsOpen && (
            <div style={{
              border: "1px solid #ccc",
              padding: 10,
              background: "#fff",
              position: "absolute",
              zIndex: 10,
            }}>
              {ITEMS.map(item => (
                <label key={item} style={{ display: "block" }}>
                  <input type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleItem(item)}
                  /> {item}
                </label>
              ))}
            </div>
          )}
        </div>

        <label style={{ marginLeft: 20 }}>
          Selection Type:
          <select
            value={selectionType}
            onChange={e => setSelectionType(e.target.value as SelectionType)}
          >
            {SELECTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>

        <button style={{ marginLeft: 20 }} onClick={generateSheet}>Submit</button>
      </div>

      <div ref={containerRef} style={{ width: "100%", height: "600px", border: "1px solid #ccc" }} />
    </div>
  );
};

export default Spreadsheet;
