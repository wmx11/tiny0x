import { LoadingOverlay } from '@mantine/core';
import React, { FC, ReactNode } from 'react';

type TableTypes = {
  header?: string[];
  rows?: {
    row: string[] | number[] | ReactNode[];
  }[];
  style?: React.CSSProperties;
  isLoading?: boolean;
  empty?: string | number | ReactNode;
};

const Table: FC<TableTypes> = ({ header, rows, style, isLoading, empty }) => {
  return (
    <div className="relative">
      <LoadingOverlay visible={isLoading as boolean} />
      <div
        className="grid bg-white/10 backdrop-blur border-b-2 border-b-white/20 px-4 py-6 font-bold gap-6"
        style={{
          gridTemplateColumns: Array(header?.length).fill('1fr').join(' '),
          ...style,
        }}
      >
        {header &&
          header.length &&
          header.map((header, headerIndex) => (
            <div key={`header_${headerIndex}`}>{header}</div>
          ))}
      </div>
      {rows && rows.length ? (
        rows.map(({ row }, rowsIndex) => (
          <div
            key={`rows_item_${rowsIndex}`}
            className="grid bg-white/10 backdrop-blur border-b border-b-white/20 p-4 gap-6 items-center hover:opacity-80"
            style={{
              gridTemplateColumns: Array(row?.length).fill('1fr').join(' '),
              ...style,
            }}
          >
            {row &&
              row.map((rowItem, rowItemIndex) => (
                <div key={`row_item_${rowItemIndex}`}>{rowItem}</div>
              ))}
          </div>
        ))
      ) : (
        <div className="bg-white/10 px-4 py-6 flex items-center justify-center">
          {empty}
        </div>
      )}
    </div>
  );
};

export default Table;
