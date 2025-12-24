import React, { useRef } from 'react';
import * as GC from '@mescius/spread-sheets';
import "@mescius/spread-sheets-charts";
import { SpreadSheets } from '@mescius/spread-sheets-react';

const BrowserMarketShare: React.FC = () => {
  const spreadRef = useRef<GC.Spread.Sheets.Workbook | null>(null);

  const initSpread = (spread: GC.Spread.Sheets.Workbook) => {
    spreadRef.current = spread;

    // Get active sheet
    const activeSheet = spread.getSheet(0);

    // Prepare data 
    const dataArray: (string | number)[][] = [
      ['', 'Chrome', 'Firefox', 'IE', 'Safari', 'Edge', 'Opera', 'Other'],
      ['2014', 0.4966, 0.1801, 0.2455, 0.0470, 0.0, 0.0150, 0.0158],
      ['2015', 0.5689, 0.1560, 0.1652, 0.0529, 0.0158, 0.0220, 0.0192],
      ['2016', 0.6230, 0.1531, 0.1073, 0.0464, 0.0311, 0.0166, 0.0225],
      ['2017', 0.6360, 0.1304, 0.0834, 0.0589, 0.0443, 0.0223, 0.0246]
    ];

    activeSheet.setArray(0, 0, dataArray);

    //Pie Chart    
   const pieChart = activeSheet.charts.add(
      'PieChart',
      GC.Spread.Sheets.Charts.ChartType.pie,
      0,
      50,
      600,
      400,
      'A1:H2'
    );

    const pieDataLabels = pieChart.dataLabels();
    pieDataLabels.showValue = true;
    pieDataLabels.showSeriesName = false;
    pieDataLabels.showCategoryName = true;
    pieDataLabels.format = '0.00%';
    pieDataLabels.position = GC.Spread.Sheets.Charts.DataLabelPosition.bestFit;
    pieChart.dataLabels(pieDataLabels);

    const pieTitle = pieChart.title();
    pieTitle.text = 'Browser Market Share';
    pieTitle.fontSize = 18;
    pieChart.title(pieTitle);

    pieChart.legend({
      position: GC.Spread.Sheets.Charts.LegendPosition.right
    });

    const pieSeriesItem = pieChart.series().get(0);
    pieSeriesItem.backColor =
      'rgb(91,155,213),rgb(237,125,49),rgb(165,165,165),rgb(255,192,0),rgb(68,114,196),rgb(112,173,71),rgb(255,20,128)';
    pieSeriesItem.border.width = 3;
    pieChart.series().set(0, pieSeriesItem);


    //Doughnut Chart
    const doughnutChart = activeSheet.charts.add(
      'DoughnutChart',
      GC.Spread.Sheets.Charts.ChartType.doughnut,
      0,
      100,
      600,
      320,
      'A1:H5'
    );

    const series = doughnutChart.series().get();
    series.forEach((item: GC.Spread.Sheets.Charts.ISeries, index: number) => {
      item.backColor =
        'rgb(91,155,213)',
        'rgb(237,125,49)',
        'rgb(165,165,165)',
        'rgb(255,192,0)',
        'rgb(68,114,196)',
        'rgb(112,173,71)',
        'rgb(255,20,128)';
      doughnutChart.series().set(index, item);
    });

    doughnutChart.legend({
      position: GC.Spread.Sheets.Charts.LegendPosition.right
    });

    const doughnutTitle = doughnutChart.title();
    doughnutTitle.text = 'Browser Market Share';
    doughnutTitle.fontSize = 18;
    doughnutChart.title(doughnutTitle);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <SpreadSheets
        workbookInitialized={initSpread}
        hostStyle={{ width: '100%', height: '100%' }}
        // sheetCount={3}
      />
    </div>
  );
};

export default BrowserMarketShare;



