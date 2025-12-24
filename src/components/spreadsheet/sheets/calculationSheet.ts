import GC from "@mescius/spread-sheets";

export const setupCalculationSheet = (sheet: GC.Spread.Sheets.Worksheet) => {
  sheet.name("Sales Sheet");
  const headers = [
    "Item",
    "Quantity",
    "Unit Price",
    "Cost",
    "Total Price",
    "Discount",
    "Net Price",
    "Profit",
    "Loss",
  ];

  const items = [
    ["Apple", 10, 50, 40, null, 10],
    ["Banana", 20, 30, 25, null, 5],
    ["Orange", 15, 40, 30, null, 8],
    ["Mango", 12, 60, 50, null, 12],
    ["Grapes", 18, 70, 55, null, 15],
  ];

  sheet.setArray(0, 0, [headers]);

  const table = sheet.tables.add(
    "SalesTable",
    0,
    0,
    items.length + 1,
    headers.length
  );

  table.showHeader(true);
  table.filterButtonVisible(true);
  table.style("TableStyleMedium2");

  items.forEach((row, i) => {
    sheet.setArray(i + 1, 0, [row]);
  });

  for (let i = 0; i < items.length; i++) {
    const r = i + 1;
    sheet.setFormula(r, 4, `=B${r + 1}*C${r + 1}`);
    sheet.setFormula(r, 6, `=E${r + 1}-F${r + 1}`);
    sheet.setFormula(r, 7, `=MAX(0, G${r + 1}-(B${r + 1}*D${r + 1}))`);
    sheet.setFormula(r, 8, `=MAX(0, (B${r + 1}*D${r + 1})-G${r + 1})`);
  }

  for (let c = 0; c < headers.length; c++) {
    sheet.autoFitColumn(c);
  }
};
