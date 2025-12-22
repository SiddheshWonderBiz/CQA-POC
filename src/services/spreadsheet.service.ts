import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-excelio";

const excelIO = new GC.Spread.Excel.IO();

/* EXPORT */
export const exportToExcel = (spread: GC.Spread.Sheets.Workbook) => {
  excelIO.save(
    spread,
    (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spreadsheet.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    },
    (error) => {
      console.error("Export error:", error);
    }
  );
};

/* IMPORT */
export const importFromExcel = (
  spread: GC.Spread.Sheets.Workbook,
  file: File
) => {
  excelIO.open(
    file,
    (json) => {
      spread.fromJSON(json);
      console.log("Import successful");
    },
    (error) => {
      console.error("Import failed:", error);
    }
  );
};
