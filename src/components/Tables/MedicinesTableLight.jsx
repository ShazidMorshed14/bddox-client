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
  IconNewSection,
  IconPencil,
  IconPrescription,
  IconSelect,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { getBadge } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const MedicinesTableLight = ({
  data,
  handleSelectItem,
  handleDeleteItem,
  setPrescribeMedicineModal,
}) => {
  const navigate = useNavigate();

  const ths = (
    <tr style={{ fontSize: 'small !important' }}>
      <th>Name</th>
      <th>Format</th>
      <th>Generic</th>
      <th>Company</th>
      <th>Action</th>
    </tr>
  );

  const rows = data.map((product, index) => {
    return (
      <tr key={index} style={{ padding: '0em' }}>
        <td>{product?.name}</td>
        <td>{product?.formatId?.name}</td>
        <td>{product?.genericId?.name}</td>
        <td>{product?.companyId?.name}</td>
        <td>
          <Button
            size="xs"
            onClick={() => {
              handleSelectItem(product);
              setPrescribeMedicineModal(true);
            }}
            className="primary_btn">
            Select
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <TableComponent ths={ths} rows={rows} data={data} tableHeight={'60vh'} />
    </div>
  );
};

export default MedicinesTableLight;
