import React from 'react';
import { calculateAge, getProgressBar } from '../../constants/const';
import { Badge, Box, Button, Center, Menu, Text } from '@mantine/core';
import TableComponent from '../Global/TableComponent';
import {
  IconCalendar,
  IconDetails,
  IconDots,
  IconDotsVertical,
  IconEyeCheck,
  IconPencil,
  IconPrescription,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { getBadge } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const MedicinesTable = ({ data, handleSelectItem, handleDeleteItem }) => {
  const navigate = useNavigate();

  const ths = (
    <tr>
      <th>Name</th>
      <th>Format</th>
      <th>Generic</th>
      <th>Company</th>
      <th>Last Update</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  );

  const rows = data.map((product, index) => {
    return (
      <tr key={index} style={{ padding: '1em' }}>
        <td>{product?.name}</td>
        <td>{product?.formatId?.name}</td>
        <td>{product?.genericId?.name}</td>
        <td>{product?.companyId?.name}</td>
        <td>{dayjs(product?.updatedAt).format('MMM DD, YYYY')}</td>
        <td>
          {product?.status === 'active' ? (
            <Badge color="green">Active</Badge>
          ) : (
            <Badge color="red">Deactive</Badge>
          )}
        </td>

        <td>
          <Center>
            <Menu shadow="md" width={200}>
              <Menu.Target style={{ cursor: 'pointer' }}>
                <IconDotsVertical size={18} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconPencil size={18} />}
                  onClick={() => handleSelectItem(product)}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={16} />}
                  onClick={() => handleDeleteItem(product._id)}>
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Center>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <TableComponent ths={ths} rows={rows} data={data} tableHeight={'68vh'} />
    </div>
  );
};

export default MedicinesTable;
