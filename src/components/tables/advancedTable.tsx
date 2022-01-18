import React, { useEffect, forwardRef, useRef } from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import styled from '@emotion/styled';
import { alpha, Theme } from '@mui/material';

export type StatementData = {
  col1: string;
  col2: string;
};

const TableContainer = styled.div<{ theme?: Theme }>`
  width: max-content;
  max-width: 100%;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  overflow: auto;
  background-color: ${({ theme }) => theme.palette.common.white};
`;

const Table = styled.table`
  width: max-content;
  border-collapse: collapse;
`;

const TableHead = styled.thead<{ theme?: Theme }>``;

const TableRow = styled.tr<{ theme?: Theme }>`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;
const TableData = styled.td<{ theme?: Theme }>`
  padding: 20px 20px 20px 10px;
`;

const TableBody = styled.tbody<{ theme?: Theme }>`
  ${TableData} {
    padding: 10px;
  }
  ${TableRow} {
    &:nth-child(even) {
      background-color: ${({ theme }) =>
        alpha(theme.palette.grey['A100'], 0.8)};
    }
    &:hover {
      background-color: ${({ theme }) => alpha(theme.palette.grey['300'], 0.8)};
    }
  }
`;

export default function AdvancedTable() {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'Column 1',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col2',
        },
        {
          Header: 'Column 1',
          accessor: 'col3', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col4',
        },
        {
          Header: 'Column 1',
          accessor: 'col5', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col6',
        },
        {
          Header: 'Column 1',
          accessor: 'col7', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col8',
        },
        {
          Header: 'Column 1',
          accessor: 'col9', // accessor is the "key" in the data
        },
        {
          Header: 'Column 2',
          accessor: 'col10',
        },
      ] as Column<StatementData>[],
    []
  );
  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns }, useSortBy, (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    });

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(({ getHeaderGroupProps, headers }, index) => (
            <TableRow {...getHeaderGroupProps()} key={index}>
              {headers.map(
                ({ getHeaderProps, render, getSortByToggleProps }, i) => (
                  <TableData
                    key={i}
                    {...getHeaderProps(getSortByToggleProps())}
                  >
                    {render('Header')}
                  </TableData>
                )
              )}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <TableData key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}