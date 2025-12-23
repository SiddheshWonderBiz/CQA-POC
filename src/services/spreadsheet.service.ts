import * as GC from "@mescius/spread-sheets";
import "@mescius/spread-sheets-io";

//activate Sales Sheet after import
const activateSalesSheet = (spread: GC.Spread.Sheets.Workbook) => {
  const index = spread.getSheetIndex("Sales Sheet");
  if (index >= 0) {
    spread.setActiveSheetIndex(index);
  }
};


//Excel
export const exportToExcel = (spread: GC.Spread.Sheets.Workbook) => {
  spread.export(
    (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spreadsheet.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    },
    (err: any) => console.error("Excel export failed:", err),
    { fileType: GC.Spread.Sheets.FileType.excel }
  );
};

export const importFromExcel = (
  spread: GC.Spread.Sheets.Workbook,
  file: File
) => {
  activateSalesSheet(spread);

  spread.import(
    file,
    () => {
      console.log("Excel import successful");
    },
    (err: any) => {
      console.error("Excel import failed:", err);
    }
  );
};


//JSON
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

    spread.suspendPaint();

    while (spread.getSheetCount() > 0) {
      spread.removeSheet(0);
    }

    spread.fromJSON(json);

    spread.resumePaint();

    if (spread.getSheetCount() > 0) {
      spread.setActiveSheetIndex(0);
    }

    spread.repaint();

    console.log("JSON import successful & visible");
  };

  reader.readAsText(file);
};






