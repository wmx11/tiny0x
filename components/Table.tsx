import { LoadingOverlay } from '@mantine/core';
import React, { FC, ReactNode } from 'react';

type TableTypes = {
  header?: string[];
  rows?: {
    row: string[] | number[] | ReactNode[];
  }[];
  style?: React.CSSProperties;
  stickyCol?: number;
  isLoading?: boolean;
  empty?: string | number | ReactNode;
};

const Table: FC<TableTypes> = ({
  header,
  rows,
  style,
  isLoading,
  empty,
  stickyCol = 1,
}) => {
  return (
    <div className="relative overflow-x-auto">
      <LoadingOverlay visible={isLoading as boolean} color="pink" />
      <div
        className="grid font-bold "
        style={{
          gridTemplateColumns: Array(header?.length).fill('1fr').join(' '),
          ...style,
        }}
      >
        {header &&
          header.length &&
          header.map((header, headerIndex) => (
            <div
              className={`backdrop-blur bg-[#565264] px-4 py-6 border-b-2 border-b-white/20 ${
                headerIndex + 1 === stickyCol ? 'table--column__sticky' : ''
              }`}
              key={`header_${headerIndex}`}
            >
              {header}
            </div>
          ))}
      </div>
      {rows && rows.length ? (
        rows.map(({ row }, rowsIndex) => (
          <div
            key={`rows_item_${rowsIndex}`}
            className="grid hover:opacity-80"
            style={{
              gridTemplateColumns: Array(row?.length).fill('1fr').join(' '),
              ...style,
            }}
          >
            {row &&
              row.map((rowItem, rowItemIndex) => (
                <div
                  className={`backdrop-blur border-b border-b-white/20  bg-[#565264] p-4 ${
                    rowItemIndex + 1 === stickyCol
                      ? 'table--column__sticky'
                      : ''
                  }`}
                  key={`row_item_${rowItemIndex}`}
                >
                  {rowItem}
                </div>
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
