import {
  ActionIcon,
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Loader,
  LoadingOverlay,
  Modal,
  Pagination,
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
import MedicinesTable from '../Tables/MedicinesTable';
import ShowItems from '../Global/ShowItems';
import { fetchDoctorsMedicines } from '../../services/medicines';
import MedicinesTableLight from '../Tables/MedicinesTableLight';
import AddFormatForm from '../Forms/AddFormatForm';
import AddGenericForm from '../Forms/AddGenericForm';
import AddCompanyForm from '../Forms/AddCompanyForm';
import AddMedicineDrawer from '../Drawers/AddMedicineDrawer';
import { useDisclosure } from '@mantine/hooks';
import PrescribeMedicineModal from './PrescribeMedicineModal';

const MedicineSelectModal = ({
  opened,
  close,
  medicines: medicineList,
  setMedicines,
}) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState(null);
  const [formatId, setFormatId] = useState(null);
  const [genericId, setGenericId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [invokingRefreshForSearchInput, setInvokingRefreshForSearchInput] =
    useState(null);

  const [tempMedicineList, setTempMedicineList] = useState(
    medicineList ? medicineList : [],
  );

  //states for modals and drawers
  //add medicine drawer
  const [addDrawerOpened, { open: addDrawerOpen, close: addDrawerClose }] =
    useDisclosure(false);
  const [prescribeMedicineModal, setPrescribeMedicineModal] = useState(false);

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

  const handlePageSize = (value) => {
    setPage(1);
    setPageSize(value);
  };

  const handleSelectItem = (data) => {
    setSelectedItem(data);
    setPrescribeMedicineModal(true);
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
      'active',
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

  if (formatsIsLoading || genericsIsLoading || companiesIsLoading)
    return <div></div>;

  const { formats } = formatsData.data.data;
  const { generics } = genericsData.data.data;
  const { companies } = companiesData.data.data;
  const { medicines, total } = data.data.data;

  return (
    <Modal
      opened={opened}
      onClose={() => {
        //setOptionSelectBox(false);
        setSelectedItem(null);
        setMedicines(null);
        close();
      }}
      title="Select Medicines"
      size="auto"
      closeOnClickOutside={false}>
      <div style={{ minHeight: '80vh', minWidth: '80vw' }}>
        <LoadingOverlay
          visible={
            formatsIsLoading ||
            genericsIsLoading ||
            companiesIsLoading ||
            isFetching
          }
          overlayBlur={2}
          loader={
            <Stack justify="center" align="center">
              <Text>Fetching Data...</Text>
              <Loader size="xs" />
            </Stack>
          }
        />

        {/* add new medicine */}
        <AddMedicineDrawer
          opened={addDrawerOpened}
          close={addDrawerClose}
          refetchData={refetchData}
        />

        {/* prescribe medicine modal*/}
        <Modal
          opened={prescribeMedicineModal && selectedItem}
          shadow="lg"
          onClose={() => {
            setSelectedItem(null);
            setPrescribeMedicineModal(false);
          }}
          title={<Text fw={600}>{selectedItem?.name}</Text>}
          centered
          closeOnClickOutside={false}
          overlayProps={{ opacity: 0.5, blur: 4 }}
          size="xl">
          <PrescribeMedicineModal
            closeModal={() => {
              setSelectedItem(null);
              setPrescribeMedicineModal(false);
            }}
            setMedicines={setTempMedicineList}
            selectedItem={selectedItem}
            medicines={tempMedicineList}
          />
        </Modal>

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

              {name || formatId || genericId || companyId ? (
                <Button color="orange" onClick={() => handleRefresh()}>
                  Refresh
                </Button>
              ) : (
                <></>
              )}

              {isArrayAndHasContent(tempMedicineList) && (
                <>
                  <Text py="xs" fw={600} fz="xs">
                    Already Assigned Medicines
                  </Text>
                  <ScrollArea sx={{ height: '20vh' }}>
                    <Flex gap={10} wrap="wrap">
                      {tempMedicineList?.map((med, index) => {
                        return <Badge key={index}>{med?.medicine?.name}</Badge>;
                      })}
                    </Flex>
                  </ScrollArea>
                  <Button
                    color="red"
                    onClick={() => {
                      setTempMedicineList([]);
                      setMedicines([]);
                    }}
                    py="xs"
                    size="xs">
                    Clear List
                  </Button>
                </>
              )}
            </Flex>
          </Grid.Col>
          <Grid.Col lg={9} md={9} sm={12} xs={12}>
            <>
              <MedicinesTableLight
                data={medicines}
                handleSelectItem={handleSelectItem}
                //handleDeleteItem={handleDeleteItem}
                setPrescribeMedicineModal={setPrescribeMedicineModal}
              />
              <Flex justify="flex-end" align="center">
                <Pagination
                  mt="20px"
                  value={page}
                  onChange={setPage}
                  total={Math.ceil(total / (pageSize ? pageSize : 10))}
                />
              </Flex>
            </>
          </Grid.Col>
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
              <Button size="xs" className="primary_btn" onClick={addDrawerOpen}>
                Add Medicine
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
              <Button
                //className="primary_btn"
                disabled={isArrayAndHasContent(tempMedicineList) ? false : true}
                onClick={() => {
                  setMedicines(tempMedicineList);
                  close();
                }}>
                Save
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </Modal>
  );
};

export default MedicineSelectModal;
