import { CSSObject } from '@mantine/core';
import React, { FC, ReactNode } from 'react';

type TableTypes = {
  header?: string[];
  rows?: {
    row: string[] | number[] | ReactNode[];
  }[];
  style?: React.CSSProperties;
};

const Table: FC<TableTypes> = ({ header, rows, style }) => {
  return (
    <div>
      <div
        className="grid rounded-md bg-white/10 backdrop-blur mb-4 p-4 font-bold gap-4"
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
      {rows &&
        rows.length &&
        rows.map(({ row }, rowsIndex) => (
          <div
            key={`rows_item_${rowsIndex}`}
            className="grid rounded-md bg-white/10 backdrop-blur mb-2 p-4 gap-4 hover:opacity-80"
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
        ))}
    </div>
  );
};

export default Table;
