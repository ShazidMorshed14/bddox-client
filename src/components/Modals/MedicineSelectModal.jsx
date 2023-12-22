import {
  ActionIcon,
  Autocomplete,
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Loader,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import COLORS from '../../constants/colors';
import {
  IconPlus,
  IconRefresh,
  IconTrashFilled,
  IconX,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import {
  handleErrorResponse,
  isArrayAndHasContent,
  isObjectAndHasProperties,
} from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';
import { createTag, fetchDoctorsTags } from '../../services/tag';
import ServerErrorBox from '../Global/ServerErrorBox';
import { fetchDoctorsFormatList } from '../../services/formats';
import { fetchDoctorsGenericList } from '../../services/generics';
import { fetchDoctorsCompanyList } from '../../services/companies';
import SearchInput from '../Global/SearchInput';

const MedicineSelectModal = ({ opened, close, medicines, setMedicines }) => {
  const queryClient = useQueryClient();
  const ref = useRef();
  //console.log(data);

  const [page, setPage] = useState(1);
  const [name, setName] = useState(null);
  const [formatId, setFormatId] = useState(null);
  const [genericId, setGenericId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  //functions
  const handleRefresh = () => {
    setInvokingRefreshForSearchInput(!invokingRefreshForSearchInput);
    setName(null);
    setFormatId(null);
    setGenericId(null);
    setCompanyId(null);
  };

  const handleSearch = (value) => {
    setPage(1);
    setName(value);
  };

  //fetch all formatIds
  const {
    data: formatsData,
    isLoading: formatsIsLoading,
    error: formatsError,
    isFetching: formatsIsFetching,
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
  } = useQuery({
    queryKey: ['fetch-companies'],
    queryFn: fetchDoctorsCompanyList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (formatsIsLoading || genericsIsLoading || companiesIsLoading)
    return <div></div>;

  const { formats } = formatsData.data.data;
  const { generics } = genericsData.data.data;
  const { companies } = companiesData.data.data;
  console.log(companies);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        //setOptionSelectBox(false);
        close();
      }}
      title="Select Medicines"
      size="auto"
      closeOnClickOutside={false}>
      <div style={{ minHeight: '80vh', minWidth: '80vw' }}>
        <LoadingOverlay
          visible={formatsIsLoading}
          overlayBlur={2}
          loader={
            <Stack justify="center" align="center">
              <Text>Please wait...</Text>
              <Loader />
            </Stack>
          }
        />

        <Grid py="sm">
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <Flex direction="column" gap={10}>
              <SearchInput
                handleRefresh={() => handleRefresh()}
                handleSearch={handleSearch}
                placeholder="Search Medicine"
                invokeRefresh={invokingRefreshForSearchInput}
                refreshBtn={false}
              />
              <Select
                value={formatId}
                onChange={(e) => setFormatId(e)}
                placeholder="Select Format"
                label="Select Format"
                size="xs"
                data={formats.map((format) => {
                  return {
                    label: format.name,
                    value: format._id,
                  };
                })}
              />

              <Select
                value={genericId}
                onChange={(e) => setGenericId(e)}
                placeholder="Select Generic"
                label="Select Generic"
                size="xs"
                data={
                  generics
                    ? generics.map((generic) => {
                        return {
                          label: generic.name,
                          value: generic._id,
                        };
                      })
                    : []
                }
              />

              <Select
                value={companyId}
                onChange={(e) => setCompanyId(e)}
                placeholder="Select Company"
                label="Select Company"
                size="xs"
                data={
                  companies
                    ? companies.map((company) => {
                        return {
                          label: company.name,
                          value: company._id,
                        };
                      })
                    : []
                }
              />
            </Flex>
          </Grid.Col>
          <Grid.Col lg={9} md={9} sm={12} xs={12}></Grid.Col>
        </Grid>

        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 20,
            left: 20,
            width: '98%',
          }}>
          <Flex justify="space-between">
            <Flex gap={10}>
              <Button size="xs" onClick={() => {}}>
                Add Medicine
              </Button>
              <Button size="xs" onClick={() => {}}>
                Add Format
              </Button>
              <Button size="xs" onClick={() => {}}>
                Add Generic
              </Button>
              <Button size="xs" onClick={() => {}}>
                Add Company
              </Button>
            </Flex>
            <Flex gap={10}>
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
              <Button onClick={() => {}}>Save</Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </Modal>
  );
};

export default MedicineSelectModal;
