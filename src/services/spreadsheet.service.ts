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


export const exportToJson = (spread: GC.Spread.Sheets.Workbook) => {
  const json = spread.toJSON();
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "spreadsheet.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importFromJson = (
  spread: GC.Spread.Sheets.Workbook,
  file: File
) => {
  const reader = new FileReader();
  reader.onload = () => {
    const json = JSON.parse(reader.result as string);
    spread.fromJSON(json);
  };
  reader.readAsText(file);
};


export const exportToCSV = (spread: GC.Spread.Sheets.Workbook) => {
  const sheet = spread.getActiveSheet();
  const csv = sheet.getCsv(0, 0, sheet.getRowCount(), sheet.getColumnCount());

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sheet.csv";
  a.click();
  URL.revokeObjectURL(url);
};


export const importFromCSV = (
  spread: GC.Spread.Sheets.Workbook,
  file: File
) => {
  const reader = new FileReader();
  reader.onload = () => {
    const sheet = spread.getActiveSheet();
    sheet.setCsv(reader.result as string, 0, 0);
  };
  reader.readAsText(file);
};

