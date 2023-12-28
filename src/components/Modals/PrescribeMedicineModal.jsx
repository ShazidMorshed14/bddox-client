import {
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Group,
  Radio,
  ScrollArea,
  Select,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import {
  commonDoses,
  commonDurations,
  commonInstructions,
  commonTimes,
} from '../../constants/const';
import { isArrayAndHasContent } from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';

const PrescribeMedicineModal = ({
  closeModal,
  setMedicines,
  selectedItem,
  medicines,
}) => {
  console.log(medicines);
  const [dose, setDose] = useState(null);
  const [instruction, setInstruction] = useState(null);
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState(null);

  const handleSave = () => {
    const item = {
      medicine: selectedItem,
      dose,
      instruction,
      duration,
      time,
    };

    const isAlreadyExists = medicines.filter(
      (med) => med.medicine.name == item.medicine.name,
    );

    if (isArrayAndHasContent(isAlreadyExists)) {
      NotificationUtil({
        success: false,
        title: 'Already Exists',
        message: 'Medicine Already Added',
      });
    } else {
      setMedicines((prevItems) => [...prevItems, item]);
      setDose(null);
      setInstruction(null);
      setDuration(null);
      setTime(null);
      closeModal();
    }
  };

  return (
    <>
      <Card withBorder>
        <Grid>
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <Flex direction="column" gap={10}>
              <div>
                <Text fw={600}>Select Doses</Text>
                <ScrollArea sx={{ height: '35vh' }}>
                  <Radio.Group
                    value={dose}
                    onChange={(e) => setDose(e)}
                    withAsterisk>
                    <Group mt="xs">
                      <Flex direction="column" gap={10}>
                        {commonDoses.map((dose, index) => {
                          return (
                            <Radio
                              key={index}
                              value={dose.value}
                              label={dose.label}
                            />
                          );
                        })}
                      </Flex>
                    </Group>
                  </Radio.Group>
                </ScrollArea>
              </div>
            </Flex>
          </Grid.Col>
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <Flex direction="column" gap={10}>
              <div>
                <Text fw={600}>Select Instruction</Text>
                <ScrollArea sx={{ height: '35vh' }}>
                  <Radio.Group
                    value={instruction}
                    onChange={(e) => setInstruction(e)}
                    withAsterisk>
                    <Group mt="xs">
                      <Flex direction="column" gap={10}>
                        {commonInstructions.map((inst, index) => {
                          return (
                            <Radio
                              key={index}
                              value={inst.value}
                              label={inst.label}
                            />
                          );
                        })}
                      </Flex>
                    </Group>
                  </Radio.Group>
                </ScrollArea>
              </div>
            </Flex>
          </Grid.Col>
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <div>
              <Text fw={600}>Duration</Text>
              <ScrollArea sx={{ height: '35vh' }}>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e)}
                  data={commonDurations}
                  size="xs"
                />
              </ScrollArea>
            </div>
          </Grid.Col>
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <div>
              <Text fw={600}>Time</Text>
              <ScrollArea sx={{ height: '35vh' }}>
                <Select
                  value={time}
                  onChange={(e) => setTime(e)}
                  data={commonTimes}
                  size="xs"
                />
              </ScrollArea>
            </div>
          </Grid.Col>
        </Grid>
      </Card>
      <Flex py="sm" justify="flex-end" align="center">
        <Button className="primary_btn" onClick={() => handleSave()}>
          Add to List
        </Button>
      </Flex>
    </>
  );
};

export default PrescribeMedicineModal;
