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

  // Helper column (hidden)
  const LEGEND_COL = sheet.getColumnCount() - 1;

  const chart = sheet.charts.add(
    chartName,
    GC.Spread.Sheets.Charts.ChartType.line,
    60,
    (table2StartRow + table2ItemCount + 2) * 22,
    monthsCount * 100,
    320
  );

  chart.title({ text: "In Flow vs Out Flow Comparison" });

  chart.legend({
    position: GC.Spread.Sheets.Charts.LegendPosition.right
  });

  let legendRow = 0;

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

  sheet.setColumnVisible(LEGEND_COL, false);
};
