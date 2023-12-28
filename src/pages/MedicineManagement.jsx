import {
  ActionIcon,
  Button,
  Drawer,
  Flex,
  Loader,
  Pagination,
  Select,
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
import AddMedicineDrawer from '../components/Drawers/AddMedicineDrawer';
import { fetchDoctorsMedicines } from '../services/medicines';
import MedicinesTable from '../components/Tables/MedicinesTable';
import { fetchDoctorsFormatList } from '../services/formats';
import { fetchDoctorsGenericList } from '../services/generics';
import { fetchDoctorsCompanyList } from '../services/companies';

const MedicineManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState(null);
  const [formatId, setFormatId] = useState(null);
  const [genericId, setGenericId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [status, setStatus] = useState('active');
  const [selectedItem, setSelectedItem] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //drawers
  //add patient drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);
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

  const handleNameSearch = (value) => {
    setPage(1);
    setName(value);
  };

  const handleRefresh = () => {
    setPage(1);
    setPageSize(10);
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setFormatId(null);
    setName(null);
    setGenericId(null);
    setCompanyId(null);
    setStatus('active');
  };

  //fetch all formatIds
  const {
    data: formatsData,
    isLoading: formatsIsLoading,
    error: formatsError,
    isFetching: formatsIsFetching,
    refetch: formatsRefetch,
  } = useQuery({
    queryKey: ['fetch-formats'],
    queryFn: fetchDoctorsFormatList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetch all generics
  const {
    data: genericsData,
    isLoading: genericsIsLoading,
    error: genericsError,
    isFetching: genericsIsFetching,
    refetch: genericsRefetch,
  } = useQuery({
    queryKey: ['fetch-generics'],
    queryFn: fetchDoctorsGenericList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetch all companies
  const {
    data: companiesData,
    isLoading: companiesIsLoading,
    error: companiesError,
    isFetching: companiesIsFetching,
    refetch: companiesRefetch,
  } = useQuery({
    queryKey: ['fetch-companies'],
    queryFn: fetchDoctorsCompanyList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetching medicines
  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch: refetchData,
  } = useQuery({
    queryKey: [
      'fetch-medicines',
      page,
      pageSize,
      name,
      formatId,
      genericId,
      companyId,
      status,
      null,
    ],
    queryFn: fetchDoctorsMedicines,
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
              Medicines Corner
            </Text>
            <Flex gap={10}>
              <Button
                //onClick={addDrawerOpen}
                className="primary_btn"
                leftIcon={<IconPlus />}
                size="xs">
                Add Medicine
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

  const { formats } = formatsData.data.data;
  const { generics } = genericsData.data.data;
  const { companies } = companiesData.data.data;
  const { medicines, total } = data.data.data;

  return (
    <div>
      {/* add new medicine */}
      <AddMedicineDrawer
        opened={addDrawerOpened}
        close={addDrawerClose}
        refetchData={refetchData}
      />

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
              Medicines Corner
            </Text>
            <Flex gap={10}>
              <Button
                onClick={addDrawerOpen}
                className="primary_btn"
                leftIcon={<IconPlus />}
                size="xs">
                Add Medicine
              </Button>
            </Flex>
          </Flex>

          <Flex justify="space-between" align="center" py="sm" gap={20}>
            <Flex gap={20}>
              <SearchInput
                handleRefresh={() => handleRefresh()}
                handleSearch={handleNameSearch}
                placeholder="Search Name"
                invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <Select
                value={formatId}
                onChange={(e) => setFormatId(e)}
                placeholder="Select Fomrat"
                searchable
                nothingFound="No Data Found"
                data={formats?.map((f) => {
                  return { label: f.name, value: f._id };
                })}
                size="xs"
              />

              <Select
                value={genericId}
                onChange={(e) => setGenericId(e)}
                placeholder="Select Generic"
                searchable
                nothingFound="No Data Found"
                data={generics?.map((g) => {
                  return { label: g.name, value: g._id };
                })}
                size="xs"
              />

              <Select
                value={companyId}
                onChange={(e) => setCompanyId(e)}
                placeholder="Select Company"
                searchable
                nothingFound="No Data Found"
                data={companies?.map((c) => {
                  return { label: c.name, value: c._id };
                })}
                size="xs"
              />

              <Select
                value={status}
                onChange={(e) => setStatus(e)}
                data={[
                  {
                    label: 'Active',
                    value: 'active',
                  },
                  {
                    label: 'Inactive',
                    value: 'inactive',
                  },
                ]}
                size="xs"
              />

              <Tooltip label="Refresh">
                <ActionIcon
                  size="md"
                  onClick={handleRefresh}
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
                <MedicinesTable
                  data={medicines}
                  handleSelectItem={handleSelectItem}
                  //handleDeleteItem={handleDeleteItem}
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

export default MedicineManagement;
