import { FC } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMap from 'highcharts/modules/map';
import TopoJson from './topo.json';
import { PRIMARY_GRAPE, PRIMARY_PURPLE } from '@/utils/contstants';

type WorldHeatMapTypes = {
  data: Highcharts.SeriesMapDataOptions[];
  title: string;
  subtitle?: string;
  yTitle?: string;
  tooltip?: string | Record<string, string>;
};

const WorldMap: FC<WorldHeatMapTypes> = ({
  data,
  title,
  subtitle,
  tooltip,
}) => {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }

  if (!data) {
    return null;
  }

  HighchartsMap(Highcharts);

  const options: Highcharts.Options = {
    chart: {
      map: TopoJson,
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: 'transparent',
    },
    colors: [PRIMARY_PURPLE, PRIMARY_GRAPE],
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

    legend: {
      enabled: true,
    },

    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
    },

    colorAxis: {
      minColor: PRIMARY_PURPLE,
      maxColor: PRIMARY_GRAPE,
      min: 1,
      max: 10000,
      type: 'logarithmic',
    },
    series: [
      {
        data,
        type: 'map',
        name: 'Clicks',
        joinBy: ['iso-a2', 'code'],
        states: {
          hover: {
            color: PRIMARY_PURPLE,
          },
        },
        tooltip: {
          // pointFormat: '{point.country}: {point.z} Clicks',
          pointFormat: tooltip as string,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />
    </div>
  );
};

export default WorldMap;
