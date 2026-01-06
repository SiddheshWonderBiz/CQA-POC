import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-charts";

export const colToLetter = (col: number) => {
  let letter = "";
  let temp = col + 1;
  while (temp > 0) {
    const mod = (temp - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    temp = Math.floor((temp - mod) / 26);
  }
  return letter;
};

const toA1 = (row: number, col: number) =>
  `${colToLetter(col)}${row + 1}`;

export const rangeToA1 = (
  row: number,
  col: number,
  rowCount: number,
  colCount: number
) => {
  const start = toA1(row, col);
  const end = toA1(row + rowCount - 1, col + colCount - 1);
  return start === end ? start : `${start}:${end}`;
};

const getXAfterTable = (
  sheet: GC.Spread.Sheets.Worksheet,
  endCol: number
) => {
  let x = 0;
  for (let c = 0; c <= endCol; c++) {
    x += sheet.getColumnWidth(c);
  }
  return x + 20;
};

export const createComparisonChart = (
  sheet: GC.Spread.Sheets.Worksheet,
  monthsCount: number,
  table1StartRow: number,
  table1ItemCount: number,
  table2StartRow: number,
  table2ItemCount: number
) => {
  const chartName = "Comparison Chart";
  const oldChart = sheet.charts.get(chartName);
  if (oldChart) sheet.charts.remove(chartName);

  const LEGEND_COL = sheet.getColumnCount() - 1;

  // Calculate chart position
  const tableEndCol = monthsCount;
  const chartX = getXAfterTable(sheet, tableEndCol);
  const chartY = table1StartRow * 22;

  const chart = sheet.charts.add(
    chartName,
    GC.Spread.Sheets.Charts.ChartType.line,
    chartX,
    chartY,
    monthsCount * 100,
    320
  );

  chart.title({ text: "In Flow vs Out Flow Comparison" });

  chart.legend({
    position: GC.Spread.Sheets.Charts.LegendPosition.right
  });

  let legendRow = 0;

  // In Flow series
  for (let r = 0; r < table1ItemCount; r++) {
    const itemName = sheet.getValue(table1StartRow + r, 0);

    sheet.setValue(legendRow, LEGEND_COL, `In Flow - ${itemName}`);

    chart.series().add({
      name: toA1(legendRow, LEGEND_COL),
      xValues: rangeToA1(table1StartRow - 1, 1, 1, monthsCount),
      yValues: rangeToA1(table1StartRow + r, 1, 1, monthsCount),
      chartType: GC.Spread.Sheets.Charts.ChartType.line
    });

    legendRow++;
  }

  // Out Flow series
  for (let r = 0; r < table2ItemCount; r++) {
    const itemName = sheet.getValue(table2StartRow + r, 0);

    sheet.setValue(legendRow, LEGEND_COL, `Out Flow - ${itemName}`);

    chart.series().add({
      name: toA1(legendRow, LEGEND_COL),
      xValues: rangeToA1(table2StartRow - 1, 1, 1, monthsCount),
      yValues: rangeToA1(table2StartRow + r, 1, 1, monthsCount),
      chartType: GC.Spread.Sheets.Charts.ChartType.lineMarkers
    });

    legendRow++;
  }

  // Hide helper legend column
  sheet.setColumnVisible(LEGEND_COL, false);
};
