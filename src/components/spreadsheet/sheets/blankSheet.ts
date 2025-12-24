import GC from "@mescius/spread-sheets";

export const setupBlankSheet = (sheet: GC.Spread.Sheets.Worksheet) => {
  sheet.name("Blank Sheet");
};
