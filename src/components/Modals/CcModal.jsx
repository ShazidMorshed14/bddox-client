import {
  ActionIcon,
  Autocomplete,
  Badge,
  Button,
  Card,
  Flex,
  Loader,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import COLORS from '../../constants/colors';
import { IconPlus, IconTrashFilled, IconX } from '@tabler/icons-react';
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

const CcModal = ({ opened, close, ccs, setCcs }) => {
  const queryClient = useQueryClient();
  const ref = useRef();
  //console.log(data);

  const [type, setType] = useState('cc');
  const [searchKey, setSearchKey] = useState('');
  const [currentSelectedTag, setCurrentSelectedTag] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showOptionSelectBox, setOptionSelectBox] = useState(false);
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [other, setOther] = useState('');

  const form = useForm({
    initialValues: {
      type: type,
      value: '',
    },

    validate: {
      type: (value) => (value.length < 1 ? 'type must be given' : null),
      value: (value) => (value.length < 1 ? 'value must be given' : null),
    },
  });

  //fetching tags
  const {
    data: tagsList,
    isLoading: tagsLoading,
    error: tagsError,
    isFetching: tagsIsFetching,
  } = useQuery({
    queryKey: ['fetch-tags-doctorwise', type],
    queryFn: fetchDoctorsTags,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  const refetchTags = async () => {
    queryClient.invalidateQueries('fetch-tags-doctorwise');
    await queryClient.refetchQueries({
      queryKey: ['fetch-appointments'],
      type: 'active',
    });
  };

  const {
    mutate: addTagMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => createTag(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchTags();
        NotificationUtil({
          success: true,
          title: 'Success',
          message: 'Tag Added successfully!',
        });
        form.reset();
      }
    },
  });

  const handleSubmit = (values) => {
    addTagMutate(values);
  };

  const handleSelectedTags = (value) => {
    setCurrentSelectedTag(value);
    setOptionSelectBox(true);
  };

  const addSelectedTag = (value, duration, time, other) => {
    let newItem = {
      id: value.id,
      value: `${value.value} ${duration ? duration : ''} ${time ? time : ''} ${
        other ? other : ''
      }`,
    };

    if (isArrayAndHasContent(selectedTags)) {
      if (selectedTags.find((item) => item.id === newItem.id)) return;
      const tempData = [];
      tempData.push(...selectedTags);
      tempData.push(newItem);
      setSelectedTags(tempData);
    } else {
      const tempData = [];
      tempData.push(newItem);
      setSelectedTags(tempData);
    }

    setCurrentSelectedTag(null);
    setDuration(null);
    setTime(null);
    setOther(null);
    setOptionSelectBox(false);
  };

  const handleOmitTag = (tag) => {
    const tempData = selectedTags.filter((item) => item.id !== tag.id);
    setSelectedTags(tempData);
  };

  const handleSave = (selectedTags) => {
    setCcs(selectedTags);
    close();
  };

  if (tagsError)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOptionSelectBox(false);
        close();
      }}
      title="C/C"
      size="xl"
      closeOnClickOutside={false}>
      <div style={{ minHeight: '60vh' }}>
        <LoadingOverlay
          visible={isLoading || tagsLoading}
          overlayBlur={2}
          loader={
            <Stack justify="center" align="center">
              <Text>Please wait...</Text>
              <Loader />
            </Stack>
          }
        />

        <Flex justify="space-between" gap={10}>
          <div style={{ width: '50%' }}>
            <Autocomplete
              label="Search and select tags"
              placeholder="Pick a tag"
              onChange={(value) => {
                if (searchKey && searchKey?.length === 0) {
                  setSearchKey(null);
                } else {
                  setSearchKey(value.trim());
                }
              }}
              limit={tagsList?.data?.data?.tags?.length || 0}
              maxDropdownHeight="200px"
              dropdownPosition="bottom"
              nothingFound="No options"
              //   value={searchKey}
              onItemSubmit={handleSelectedTags}
              onDropdownClose={() => {
                setSearchKey(null);
              }}
              data={
                tagsList?.data?.data?.tags.map((tag) => ({
                  id: tag._id,
                  value: tag.value,
                })) || []
              }
            />

            {isArrayAndHasContent(selectedTags) ? (
              <Card my={10}>
                <Text py="sm" fz="sm">
                  Selected Tags
                </Text>
                <Flex
                  gap={10}
                  align="flex-start"
                  wrap="wrap"
                  direction="column">
                  {isObjectAndHasProperties(selectedTags)
                    ? selectedTags.map((tag, index) => (
                        <Badge key={index} size="md">
                          <Flex gap={5}>
                            <Text>{tag.value}</Text>
                            <ActionIcon
                              color="blue"
                              size="xs"
                              radius="xs"
                              variant="transparent"
                              onClick={() => {
                                handleOmitTag(tag);
                              }}>
                              <IconTrashFilled size={12} />
                            </ActionIcon>
                          </Flex>
                        </Badge>
                      ))
                    : null}
                </Flex>
              </Card>
            ) : null}
          </div>
          <div style={{ width: '50%' }}>
            <Flex direction="column" gap={20} align="flex-start">
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Flex gap={10} align="center" justify="center">
                  <TextInput
                    label="Add new tags"
                    placeholder="Add New tag"
                    {...form.getInputProps('value')}
                  />
                  <Button
                    disabled={!form.values.value}
                    color="dark"
                    type="submit"
                    mt={25}
                    rightIcon={<IconPlus size="1em" />}>
                    Add
                  </Button>
                </Flex>
              </form>

              {showOptionSelectBox && currentSelectedTag && (
                <Flex direction="column" gap={5}>
                  <Text fz="sm">Select Options</Text>
                  <Flex gap={2} style={{ maxWidth: '400px' }}>
                    <Select
                      placeholder="Duration"
                      data={Array.from({ length: 29 }, (_, index) =>
                        (index + 1).toString(),
                      )}
                      value={duration}
                      onChange={setDuration}
                    />
                    <Select
                      placeholder="Time"
                      data={['Day', 'Days', 'Week', 'Month', 'Year']}
                      value={time}
                      onChange={setTime}
                    />
                    <TextInput
                      placeholder="Other"
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                    <Button
                      onClick={() =>
                        addSelectedTag(
                          currentSelectedTag,
                          duration,
                          time,
                          other,
                        )
                      }
                      rightIcon={<IconPlus size="1em" />}>
                      Add
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </div>
        </Flex>
        <div style={{ position: 'absolute', bottom: 10, right: 20 }}>
          <Flex justify="flex-end" gap={10}>
            <Button
              onClick={() =>
                //addSelectedTag(currentSelectedTag, duration, time, other)
                handleSave(selectedTags)
              }>
              Save
            </Button>
          </Flex>
        </div>
      </div>
    </Modal>
  );
};

export default CcModal;
