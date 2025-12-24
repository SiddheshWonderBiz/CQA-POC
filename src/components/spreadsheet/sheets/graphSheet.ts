import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-charts";

export function setupGraphSheet(sheet: GC.Spread.Sheets.Worksheet) {
  sheet.name("Charts");

  sheet.setArray(0, 0, [
    ["Prod_Name", "Prod_Price"],
    ["Mouse", 250],
    ["Keyboard", 200],
    ["Pendrive", 150],
  ]);

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
    950,
    150,
    400,
    250,
    "A1:B4"
  );
  pieChart.title({ text: "Pie Chart" });
}
