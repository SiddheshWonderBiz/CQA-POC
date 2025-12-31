import { useEffect, useRef } from "react";
import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-charts";

const STORAGE_KEY = "spreadsheet_autosave";

const GraphSpreadsheet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize workbook
    const spread = new GC.Spread.Sheets.Workbook(containerRef.current);
    spreadRef.current = spread;

    /* 🔹 LOAD SAVED DATA */
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      spread.fromJSON(JSON.parse(savedData));
    } else {
      // Initial data (only if no saved data exists)
      const sheet = spread.getActiveSheet();
      sheet.setArray(0, 0, [
        ["Prod_Name", "Prod_Price"],
        ["Mouse", 250],
        ["Keyboard", 200],
        ["Pendrive", 150],
      ]);

      // Charts
      const columnChart = sheet.charts.add(
        "ColumnChart",
        GC.Spread.Sheets.Charts.ChartType.columnClustered,
        50,
        150,
        400,
        250,
        "A1:B4"
      );
      columnChart.title({ text: "Column Chart" });

      const lineChart = sheet.charts.add(
        "LineChart",
        GC.Spread.Sheets.Charts.ChartType.line,
        500,
        150,
        400,
        250,
        "A1:B4"
      );
      lineChart.title({ text: "Line Chart" });

      const pieChart = sheet.charts.add(
        "PieChart",
        GC.Spread.Sheets.Charts.ChartType.pie,
        1050,
        150,
        400,
        250,
        "A1:B4"
      );
      pieChart.title({ text: "Pie Chart" });
    }

    /* 🔹 AUTO-SAVE ON CHANGE */
    const saveData = () => {
      const json = spread.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
      console.log("Spreadsheet auto-saved");
    };

    spread.bind(GC.Spread.Sheets.Events.ValueChanged, saveData);
    spread.bind(GC.Spread.Sheets.Events.RangeChanged, saveData);
    spread.bind(GC.Spread.Sheets.Events.ValueChanged, saveData);

    /* 🔹 CLEANUP */
    return () => {
      spread.unbind(GC.Spread.Sheets.Events.ValueChanged, saveData);
      spread.unbind(GC.Spread.Sheets.Events.RangeChanged, saveData);
      spread.unbind(GC.Spread.Sheets.Events.ValueChanged, saveData);
      spread.destroy();
      spreadRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "600px",
        marginTop: "20px",
      }}
    />
  );
};

export default GraphSpreadsheet;
