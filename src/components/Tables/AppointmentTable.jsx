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

const AppointmentTable = ({ data, handleSelectItem, handleDeleteItem }) => {
  const navigate = useNavigate();

  const ths = (
    <tr>
      <th>AID</th>
      <th>PID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Payment</th>
      <th>Payment Status</th>
      <th>Next Visit</th>
      <th>Actions</th>
    </tr>
  );

  const rows = data.map((product, index) => {
    return (
      <tr key={index} style={{ padding: '1em' }}>
        <td>{product.aid}</td>
        <td>{product?.patientId?.pid}</td>
        <td>{product?.patientId?.name}</td>
        <td>{product?.patientId?.phone}</td>
        <td>{product.date}</td>
        <td>{product.time}</td>
        <td>{getBadge(product.status)}</td>
        <td>
          <Center>
            <Text fw={600} color="green">
              {product.payment}
            </Text>
          </Center>
        </td>
        <td>{getBadge(product.payment_status)}</td>
        <td>
          {product.next_visiting_date ? product.next_visiting_date : 'N/A'}
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
                <Menu.Item icon={<IconEyeCheck size={16} />}>Details</Menu.Item>
                <Menu.Item
                  icon={<IconPrescription size={16} />}
                  onClick={() => navigate(`/appointment/${product._id}`)}>
                  Create Prescription
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

export default AppointmentTable;
