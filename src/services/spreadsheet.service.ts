import * as GC from "@mescius/spread-sheets";
import '@mescius/spread-sheets-io';

export const exportToExcel = (spread: GC.Spread.Sheets.Workbook) => {
  spread.export(
    (blob : any) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spreadsheet.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    },
    (err  : any) => console.log(err),
    { fileType : GC.Spread.Sheets.FileType.excel}
  )
};


export const importFromExcel = (spread : GC.Spread.Sheets.Workbook , file : File) => {
    spread.import(
      file,
      () => {
        console.log("Import successful");
      },
      (err : any) => {
        console.log("Import failed: ", err);
      }
    );
}

