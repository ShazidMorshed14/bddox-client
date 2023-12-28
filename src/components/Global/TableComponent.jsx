import { Box, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { isArrayAndHasContent } from '../../utils/utils';
import NoDataPlaceholder from './NoDataPlaceholder';
import { IconPackageOff } from '@tabler/icons-react';

const TableComponent = ({ ths, rows, data, tableHeight }) => {
  return (
    <>
      {isArrayAndHasContent(data) ? (
        <ScrollArea h={tableHeight ? tableHeight : '68vh'}>
          <Table highlightOnHover verticalSpacing="md">
            <thead
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'white',
              }}>
              {ths}
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Box mih="70vh">
          <NoDataPlaceholder
            title="No Items found"
            subtext={' '}
            icon={<IconPackageOff size={70} color="#4562f7" />}
          />
        </Box>
      )}
    </>
  );
};

export default TableComponent;
