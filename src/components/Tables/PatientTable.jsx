import React from 'react';
import { calculateAge, getProgressBar } from '../../constants/const';
import { Box, Button, Center, Menu } from '@mantine/core';
import TableComponent from '../Global/TableComponent';
import {
  IconCalendar,
  IconDetails,
  IconDots,
  IconDotsVertical,
  IconEyeCheck,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

const PatientTable = ({
  data,
  handleSelectItem,
  handleDeleteItem,
  handleSelectItemAndScheduleAppointment,
}) => {
  const ths = (
    <tr>
      <th>PID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Gender</th>
      <th>Age</th>
      <th>Address</th>
      <th>Reg. Date</th>
      <th>Actions</th>
    </tr>
  );

  const rows = data.map((product, index) => {
    return (
      <tr key={index} style={{ padding: '1em' }}>
        <td>{product.pid}</td>
        <td>{product.name}</td>

        <td>{product.phone}</td>

        <td>{product.gender}</td>

        <td>{product.dob ? calculateAge(product.dob) : 'N/A'}</td>

        <td>{product.address}</td>

        <td>{dayjs(product.createdAt).format('MMM DD, YYYY')}</td>
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
                <Menu.Item icon={<IconEyeCheck size={16} />}>Details</Menu.Item>
                <Menu.Item
                  icon={<IconCalendar size={16} />}
                  onClick={() =>
                    handleSelectItemAndScheduleAppointment(product)
                  }>
                  Set Appoinment
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

export default PatientTable;
