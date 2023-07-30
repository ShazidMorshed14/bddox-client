import React from 'react';
import ManWithLaptopImage from '../../assets/images/man-with-laptop-light.png';
import { Button, Flex, Grid } from '@mantine/core';

const WelcomeCard = ({ name }) => {
  return (
    <div>
      <div className="card">
        <Grid>
          <Grid.Col md={7} lg={7} sm={12} xs={12}>
            <div className="card-body">
              <div className="card-title-color">Hello {name}! 🎉</div>
              <p className="description">
                Please Complete your profile to get all the exciting features
                together!
              </p>

              <Button
                className="btn-outline-primary"
                variant="outlined"
                size="sm">
                Check Profile
              </Button>
            </div>
          </Grid.Col>
          <Grid.Col
            md={5}
            lg={5}
            sm={12}
            xs={12}
            className=" text-center text-sm-left">
            <div className="card-body pb-0 px-0 px-md-4">
              <Flex justify="flex-end">
                <img
                  src={ManWithLaptopImage}
                  height="140"
                  alt="View Badge User"
                  data-app-dark-img="illustrations/man-with-laptop-dark.png"
                  data-app-light-img="illustrations/man-with-laptop-light.png"
                />
              </Flex>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

export default WelcomeCard;
