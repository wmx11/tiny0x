import { GlassCard } from '@/components/Cards/Cards';
import WorldMap from '@/components/Charts/WorldMap';
import Table from '@/components/Table';
import { GetLinkStatsByAliasReturnTypes } from '@/services/link';
import { Title } from '@mantine/core';
import { TableNode } from '@table-library/react-table-library';
import { Column } from '@table-library/react-table-library/types/compact';

const ClicksByCountry = ({
  data,
}: {
  data: GetLinkStatsByAliasReturnTypes;
}) => {
  const theme = {
    Table: `--data-table-library_grid-template-columns: repeat(3, 1fr);`,
    BaseCell: `
      > div {
        white-space: normal;
      }
      &:nth-of-type(1) {
        left: 0px;
        box-shadow: 2px 0px 2px rgba(0,0,0,0.1);
      }`,
  };

  const columns: Column[] = [
    {
      label: 'Country / Region',
      renderCell: (item) => <>{item.country}</>,
    },
    {
      label: 'Device',
      renderCell: (item) => <>{item.device}</>,
    },
    {
      label: 'Clicks',
      renderCell: (item) => <>{item._count}</>,
    },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex-1">
        <Title className="mb-4">Clicks by Country</Title>
        <GlassCard>
          <WorldMap
            data={data.groups.map((item) => ({
              code: item.country_code,
              country: item.country,
              value: item._count,
            }))}
            title="Clicks by Country"
            subtitle="Clicks distribution by country"
            tooltip="{point.country}: {point.value} Clicks"
          />
        </GlassCard>
      </div>
      <div className="flex-1">
        <Title className="mb-4">Top Countries / Regions</Title>
        <GlassCard>
          <Table
            data={data?.groups as unknown as TableNode[]}
            columns={columns}
            customTheme={theme}
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default ClicksByCountry;
