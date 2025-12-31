import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-charts";

const STORAGE_KEY = "spreadjs_autosave";
export function setupGraphSheet(sheet: GC.Spread.Sheets.Worksheet, spread: GC.Spread.Sheets.Workbook) {
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
  pieChart.title({ text: "Pie Chart" });

  // 🔹 AUTO-SAVE FUNCTION
  const saveData = () => {
    const json = spread.toJSON();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    console.log("Spreadsheet auto-saved");
  };

  // 🔹 Bind auto-save events
  spread.bind(GC.Spread.Sheets.Events.ValueChanged, saveData);
  spread.bind(GC.Spread.Sheets.Events.RangeChanged, saveData);
}




// import * as GC from "@mescius/spread-sheets";
// import "@mescius/spread-sheets-charts";

// const STORAGE_KEY = "spreadjs_autosave";

// export function setupGraphSheet(sheet: GC.Spread.Sheets.Worksheet) {
//   const spread = new GC.Spread.Sheets.Workbook(container);
//   const sheet = spread.getActiveSheet();

//   // 🔹 Load saved data
//   const saved = localStorage.getItem(STORAGE_KEY);
//   if (saved) {
//     spread.fromJSON(JSON.parse(saved));
//   } else {
//     // 🔹 Initial data
//     sheet.setArray(0, 0, [
//       ["Product", "Price"],
//       ["Mouse", 250],
//       ["Keyboard", 200],
//       ["Pendrive", 150],
//     ]);

//     // 🔹 Column chart
//     const columnChart = sheet.charts.add(
//       "colChart",
//       GC.Spread.Sheets.Charts.ChartType.columnClustered,
//       50,
//       100,
//       400,
//       250,
//       "A1:B4"
//     );
//     columnChart.title({ text: "Column Chart" });

//     // 🔹 Line chart
//     const lineChart = sheet.charts.add(
//       "lineChart",
//       GC.Spread.Sheets.Charts.ChartType.line,
//       500,
//       100,
//       400,
//       250,
//       "A1:B4"
//     );
//     lineChart.title({ text: "Line Chart" });

//     // 🔹 Pie chart
//     const pieChart = sheet.charts.add(
//       "pieChart",
//       GC.Spread.Sheets.Charts.ChartType.pie,
//       950,
//       100,
//       400,
//       250,
//       "A1:B4"
//     );
//     pieChart.title({ text: "Pie Chart" });
//   }

//   // 🔹 Auto-save
//   const save = () => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(spread.toJSON()));
//     console.log("Auto-saved");
//   };

//   spread.bind(GC.Spread.Sheets.Events.ValueChanged, save);
//   spread.bind(GC.Spread.Sheets.Events.RangeChanged, save);

//   return spread;
// }