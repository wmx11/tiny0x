import React, { FC } from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { PRIMARY_PURPLE, PRIMARY_GRAPE } from '@/utils/contstants';

type BarChartTypes = {
  data: Highcharts.SeriesOptionsType[];
  title: string;
  subtitle?: string;
  yTitle?: string;
  tooltip?: string | Record<string, string>;
};

const BarChart: FC<BarChartTypes> = ({
  data,
  title,
  subtitle,
  yTitle,
  tooltip,
}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: title,
      style: {
        color: '#fff',
      },
    },
    subtitle: {
      text: subtitle,
      style: {
        color: '#fff',
      },
    },
    colors: [PRIMARY_PURPLE, PRIMARY_GRAPE],
    xAxis: {
      type: 'category',
      lineColor: `${PRIMARY_PURPLE}80`,
      lineWidth: 3,
      labels: {
        rotation: -45,
        style: {
          color: '#fff',
          fontSize: '9px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      gridLineColor: `${PRIMARY_PURPLE}80`,
      min: 0,
      title: {
        text: yTitle,
      },
      labels: {
        style: {
          color: '#fff',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: tooltip as string,
    },
    series: data,
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  );
};

export default BarChart;
