import { LoadingOverlay } from '@mantine/core';
import React, { FC, ReactNode } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/mantine';
import mainTheme from './theme';
import { Column } from '@table-library/react-table-library/types/compact';
import { TableNode } from '@table-library/react-table-library/types/table';
import { Theme } from '@table-library/react-table-library/types/theme';
import { Sort } from '@table-library/react-table-library/types/sort';

type TableTypes = {
  data: TableNode[];
  columns: Column[];
  customTheme?: Theme;
  sort?: Sort;
  isLoading?: boolean;
  empty?: string | number | ReactNode;
};

const Table: FC<TableTypes> = ({
  data,
  columns,
  empty,
  customTheme = {},
  isLoading,
  sort,
}) => {
  const globalTheme = 'light';
  const mantineTheme = getTheme({
    highlightOnHover: true,
    verticalSpacing: 14,
  });
  const theme = useTheme([mantineTheme, mainTheme(globalTheme), customTheme]);

  return data ? (
    <CompactTable
      data={{ nodes: data }}
      columns={columns}
      theme={theme}
      sort={sort}
      layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
    />
  ) : (
    <>{isLoading ? <LoadingOverlay visible={isLoading} /> : empty}</>
  );
};

export default Table;
