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
import { useQuery } from '@tanstack/react-query';
import { fetchDoctorsPatients } from '../services/patient';
import ServerErrorBox from '../components/Global/ServerErrorBox';
import ShowItems from '../components/Global/ShowItems';
import PatientTable from '../components/Tables/PatientTable';
import { useDisclosure } from '@mantine/hooks';
import RegisterPatientDrawer from '../components/Drawers/RegisterPatientDrawer';

const PatientManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pid, setPid] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);

  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //add package drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);

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

  //fetching products only
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['fetch-patients', page, pageSize, pid, name, phone, null],
    queryFn: fetchDoctorsPatients,
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
              Patients Corner
            </Text>
            <Flex gap={10}>
              <Button className="primary_btn" leftIcon={<IconPlus />} size="xs">
                Register
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

  const { patients, total } = data.data.data;
  console.log('patients', patients);

  return (
    <>
      {/* add patient drawer */}
      <RegisterPatientDrawer opened={addDrawerOpened} close={addDrawerClose} />

      <div className="card">
        <div className="card-body">
          <Flex w="100%" justify="space-between" align="center" my="sm">
            <Text weight="bold" fz="md" color={COLORS.fontPrimary}>
              Patients Corner
            </Text>
            <Flex gap={10}>
              <Button
                onClick={addDrawerOpen}
                className="primary_btn"
                leftIcon={<IconPlus />}
                size="xs">
                Register
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

              <SearchInput
                handleRefresh={() => handleRefresh()}
                handleSearch={handlePidSearch}
                placeholder="Search PID"
                invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <SearchInput
                handleRefresh={() => handleRefresh()}
                handleSearch={handlePhoneSearch}
                placeholder="Search Phone"
                invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />

              <Tooltip label="Refresh">
                <ActionIcon
                  size="lg"
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
                <PatientTable
                  data={patients}
                  //handleSelectItem={handleSelectItem}
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
    </>
  );
};

export default PatientManagement;
