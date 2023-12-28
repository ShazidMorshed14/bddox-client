import React from 'react';
import { getProgressBar } from '../../constants/const';
import { Box, Button, Menu } from '@mantine/core';
import TableComponent from '../Global/TableComponent';
import {
  IconDots,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

const DemoTable = ({ data }) => {
  const ths = (
    <tr>
      <th>Platform</th>
      <th>ATP%</th>
      <th>In Stock</th>
      <th>Out of Stock</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((product, index) => {
    return (
      <tr key={index} style={{ padding: '1em' }}>
        <td>{product.label}</td>
        <td>{product.value}</td>

        <td>{product.inStock || 0}</td>

        <td>{product.outOfStock || 0}</td>
        <td>
          <Menu shadow="md" width={150}>
            <Menu.Target style={{ cursor: 'pointer' }}>
              <IconDotsVertical size={18} />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={18} />}>Edit</Menu.Item>
              <Menu.Item icon={<IconTrash size={16} />}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    );
  });

  return (
    <div className="card">
      <div className="card-body">
        <TableComponent
          ths={ths}
          rows={rows}
          data={data}
          tableHeight={'60vh'}
        />
      </div>
    </div>
  );
};

export default DemoTable;
