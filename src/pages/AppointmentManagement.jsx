import {
  ActionIcon,
  Button,
  Drawer,
  Flex,
  Loader,
  Pagination,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import React, { useState } from 'react';
import COLORS from '../constants/colors';
import { IconCalendar, IconPlus, IconRefresh } from '@tabler/icons-react';
import SearchInput from '../components/Global/SearchInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePatient, fetchDoctorsPatients } from '../services/patient';
import ServerErrorBox from '../components/Global/ServerErrorBox';
import ShowItems from '../components/Global/ShowItems';
import PatientTable from '../components/Tables/PatientTable';
import { useDisclosure } from '@mantine/hooks';
import RegisterPatientDrawer from '../components/Drawers/RegisterPatientDrawer';
import UpdatePatientDetailsDrawer from '../components/Drawers/UpdatePatientDetailsDrawer';
import { openConfirmModal } from '@mantine/modals';
import { handleErrorResponse } from '../utils/utils';
import { NotificationUtil } from '../utils/notifications';
import { fetchDoctorsAppointments } from '../services/appointment';
import AppointmentTable from '../components/Tables/AppointmentTable';
import UpdateAppointmentDrawer from '../components/Drawers/UpdateAppointmentDrawer';
const AppointmentManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pid, setPid] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //drawers
  const [editDrawerOpened, { open: editDrawerOpen, close: editDrawerClose }] =
    useDisclosure(false);

  const handleSelectItem = (data) => {
    setSelectedItem(data);
    editDrawerOpen();
  };

  const handleEditDrawerClose = () => {
    setSelectedItem(null);
    editDrawerClose();
  };

  const handlePageSize = (value) => {
    setPage(1);
    setPageSize(value);
  };

  const handlePidSearch = (value) => {
    setPage(1);
    setPid(value);
  };

  const handleNameSearch = (value) => {
    setPage(1);
    setName(value);
  };

  const handlePhoneSearch = (value) => {
    setPage(1);
    setPhone(value);
  };

  const handleRefresh = () => {
    setPage(1);
    setPageSize(10);
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setPid(null);
    setName(null);
    setPhone(null);
  };

  //fetching appointments
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['fetch-appointments', page, pageSize, pid, name, phone, null],
    queryFn: fetchDoctorsAppointments,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading)
    return (
      <div className="card">
        <div className="card-body">
          <Flex w="100%" justify="space-between" align="center" my="sm">
            <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
              Appointments Corner
            </Text>
            <Flex gap={10}>
              <Button
                //onClick={addDrawerOpen}
                className="primary_btn"
                leftIcon={<IconPlus />}
                size="xs">
                Set Appointment
              </Button>
            </Flex>
          </Flex>
          <Stack
            sx={{
              minHeight: '80vh',
            }}
            justify="center"
            align="center">
            <Loader size="md" variant="dots" />
          </Stack>
        </div>
      </div>
    );

  if (error)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  const { appointments, total } = data.data.data;
  console.log('appointments', appointments);

  return (
    <div>
      {/* edit patient details*/}
      {selectedItem && (
        <UpdateAppointmentDrawer
          opened={editDrawerOpened}
          close={handleEditDrawerClose}
          data={selectedItem}
        />
      )}

      <div className="card">
        <div className="card-body">
          <Flex w="100%" justify="space-between" align="center" my="sm">
            <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
              Appointments Corner
            </Text>
            <Flex gap={10}>
              <Button
                //onClick={addDrawerOpen}
                className="primary_btn"
                leftIcon={<IconPlus />}
                size="xs">
                Set Appointment
              </Button>
            </Flex>
          </Flex>

          <Flex justify="space-between" align="center" py="sm" gap={20}>
            <Flex gap={20}>
              <SearchInput
                //handleRefresh={() => handleRefresh()}
                //handleSearch={handleNameSearch}
                placeholder="Search Name"
                //invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <SearchInput
                //handleRefresh={() => handleRefresh()}
                //handleSearch={handlePidSearch}
                placeholder="Search PID"
                //invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <SearchInput
                //handleRefresh={() => handleRefresh()}
                //handleSearch={handlePhoneSearch}
                placeholder="Search Phone"
                //invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <Tooltip label="Refresh">
                <ActionIcon
                  size="md"
                  //onClick={handleRefresh}
                  sx={{
                    backgroundColor: COLORS.orange,
                  }}
                  variant="filled">
                  <IconRefresh size={18} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Flex>

          <div>
            {isFetching ? (
              <div>
                <Stack
                  sx={{
                    minHeight: '80vh',
                  }}
                  justify="center"
                  align="center">
                  <Loader size="md" variant="dots" />
                </Stack>
              </div>
            ) : (
              <>
                <AppointmentTable
                  data={appointments}
                  handleSelectItem={handleSelectItem}
                  //handleDeleteItem={handleDeleteItem}
                  //handleAssignPlatoformDrawer={handleAssignPlatoformDrawer}
                />
                <Flex justify="space-between" align="center">
                  <ShowItems
                    mt="20px"
                    handlePageSize={handlePageSize}
                    pageSize={pageSize}
                  />
                  <Pagination
                    mt="20px"
                    value={page}
                    onChange={setPage}
                    total={Math.ceil(total / (pageSize ? pageSize : 10))}
                  />
                </Flex>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;
