// import * as GC from "@mescius/spread-sheets";

// /**
//  * Convert column index to Excel-style column name
//  */
// const getExcelColumnName = (index: number): string => {
//   let col = "";
//   let n = index + 1;

//   while (n > 0) {
//     const rem = (n - 1) % 26;
//     col = String.fromCharCode(65 + rem) + col;
//     n = Math.floor((n - rem) / 26);
//   }

//   return col;
// };

// export const createComparisonChart = (
//   spread: GC.Spread.Sheets.Workbook,
//   monthsCount: number,
//   itemsCount: number
// ) => {
//   const sheetIndex = spread.getSheetCount();

//   // Add sheet
//   spread.addSheet(sheetIndex, new GC.Spread.Sheets.Worksheet("Comparison Chart"));

//   // Retrieve sheet
//   const chartSheet = spread.getSheet(sheetIndex);
//   if (!chartSheet) return;

//   const colEnd = getExcelColumnName(monthsCount);
//   const rowEnd = itemsCount + 1;

//   const chart = chartSheet.charts.add(
//     "lineComparison",
//     GC.Spread.Sheets.Charts.ChartType.line,
//     50,
//     40,
//     900,
//     450
//   );

//   // Sheet A series
//   chart.series().add({
//     name: "Sheet A",
//     yValues: `Sheet A!B2:${colEnd}${rowEnd}`,
//     xValues: `Sheet A!B1:${colEnd}1`
//   });

//   // Sheet B series
//   chart.series().add({
//     name: "Sheet B",
//     yValues: `Sheet B!B2:${colEnd}${rowEnd}`,
//     xValues: `Sheet B!B1:${colEnd}1`
//   });

//   chart.title({ text: "Sheet A vs Sheet B (All Items)" });
//   chart.legend({
//     position: GC.Spread.Sheets.Charts.LegendPosition.bottom
//   });
// };


// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets-charts";

// // Convert index to Excel column (0 -> A, 25 -> Z, 26 -> AA)
// const getExcelColumnName = (index: number): string => {
//   let col = "";
//   let n = index + 1;
//   while (n > 0) {
//     const rem = (n - 1) % 26;
//     col = String.fromCharCode(65 + rem) + col;
//     n = Math.floor((n - rem) / 26);
//   }
//   return col;
// };

// export const createComparisonChart = (
// spread: GC.Spread.Sheets.Workbook, sheetA: GC.Spread.Sheets.Worksheet, sheetB: GC.Spread.Sheets.Worksheet, monthsCount: number, itemsCount: number) => {
//   const sheetIndex = spread.getSheetCount();
//   spread.addSheet(sheetIndex, new GC.Spread.Sheets.Worksheet("Comparison Chart"));
//   const chartSheet = spread.getSheet(sheetIndex);
//   if (!chartSheet) return;

//   const colEnd = getExcelColumnName(monthsCount);
//   const rowEnd = itemsCount + 1;

//   const chart = chartSheet.charts.add(
//     "lineComparison",
//     GC.Spread.Sheets.Charts.ChartType.line,
//     50,
//     40,
//     900,
//     450
//   );

//   chart.series().add({
//     name: "Sheet A",
//     xValues: `Sheet A!B1:${colEnd}1`,
//     yValues: `Sheet A!B2:${colEnd}${rowEnd}`
//   });

//   chart.series().add({
//     name: "Sheet B",
//     xValues: `Sheet B!B1:${colEnd}1`,
//     yValues: `Sheet B!B2:${colEnd}${rowEnd}`
//   });

//   chart.title({ text: "Sheet A vs Sheet B (All Items)" });
//   chart.legend({ position: GC.Spread.Sheets.Charts.LegendPosition.bottom });
// };


import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-charts";

export const createComparisonChart = (
  chartSpread: GC.Spread.Sheets.Workbook,
  sheetA: GC.Spread.Sheets.Worksheet,
  sheetB: GC.Spread.Sheets.Worksheet,
  monthsCount: number,
  itemsCount: number
) => {
  chartSpread.clearSheets();
  const chartSheet = new GC.Spread.Sheets.Worksheet("Comparison");
  chartSpread.addSheet(0, chartSheet);

  const colEnd = String.fromCharCode(65 + monthsCount - 1);

  const chart = chartSheet.charts.add(
    "comparison",
    GC.Spread.Sheets.Charts.ChartType.line,
    50,
    30,
    900,
    400
  );

  for (let row = 0; row < itemsCount; row++) {
    const rowNum = row + 2;

    chart.series().add({
      name: `A - ${sheetA.getValue(row + 1, 0)}`,
      xValues: `'Sheet A'!B1:${colEnd}1`,
      yValues: `'Sheet A'!B${rowNum}:${colEnd}${rowNum}`
    });

    chart.series().add({
      name: `B - ${sheetB.getValue(row + 1, 0)}`,
      xValues: `'Sheet B'!B1:${colEnd}1`,
      yValues: `'Sheet B'!B${rowNum}:${colEnd}${rowNum}`
    });
  }

  chart.title({ text: "Sheet A vs Sheet B Comparison" });
};