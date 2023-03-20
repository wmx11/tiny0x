import { GlassCard } from '@/components/Cards/Cards';
import BarChart from '@/components/Charts/BarChart';
import Table from '@/components/Table';
import { GetLinkStatsByAliasReturnTypes } from '@/services/link';
import { Title } from '@mantine/core';
import { TableNode } from '@table-library/react-table-library';
import { Column } from '@table-library/react-table-library/types/compact';

const DeviceTypes = ({ data }: { data: GetLinkStatsByAliasReturnTypes }) => {
  const theme = {
    Table: `--data-table-library_grid-template-columns: repeat(2, 1fr);`,
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
      label: 'Device',
      renderCell: (item) => <>{item.device}</>,
    },
    {
      label: 'Clicks',
      renderCell: (item) => <>{item._count}</>,
    },
  ];

  return (
    <div>
      <Title className="mb-4">Device Types</Title>
      <GlassCard className="mb-4">
        <BarChart
          title="Device Types"
          subtitle="Click distribution by device type"
          tooltip="Clicks: {point.y}"
          data={[
            {
              type: 'bar',
              name: 'Device Type: ',
              colorByPoint: true,
              borderColor: 'none',
              data: data.groups.map((item) => [
                item.device || 'n/a',
                item._count,
              ]),
            },
          ]}
        />
      </GlassCard>
      <GlassCard>
        <Table
          data={data?.groups as unknown as TableNode[]}
          columns={columns}
          customTheme={theme}
        />
      </GlassCard>
    </div>
  );
};

export default DeviceTypes;
