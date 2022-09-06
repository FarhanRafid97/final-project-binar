import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { Component } from 'react';
import Slider from 'react-slick';

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div w="800px">
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          <div>
            <Box justifyContent="center" alignItems="center">
              <Image
                width="150"
                height="400px"
                src="/assets/team2.png"
                alt="asset-team"
              />
              <Text mb="40px">
                Farhan Rafid Syauqi <br /> as <br /> Lead Dev // Fullstack Dev
              </Text>
            </Box>
          </div>
          <div>
            <Image
              width="150px"
              height="400px"
              src="/assets/team1.png"
              _hover={{ filter: 'drop-shadow(0 6mm 4mm rgb(160, 0, 210))' }}
              alt="asset-team"
            />
            <Text mb="60px">
              Laily Ramadhani <br /> as <br /> Scrum Master // Front End Dev
            </Text>
          </div>
          <div>
            <Image
              width="150px"
              height="400px"
              src="/assets/team3.png"
              _hover={{ filter: 'drop-shadow(0 6mm 4mm rgb(160, 0, 210))' }}
              alt="asset-team"
            />
            <Text mb="60px">
              Nugi Alindro <br /> as <br /> Product Owner // Front End Dev
            </Text>
          </div>
        </Slider>

        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <Box
              margin="30px 0 50px 0"
              _hover={{ filter: 'drop-shadow(0 2mm 4mm rgb(160, 0, 210))' }}
            >
              <Image
                width="80px"
                height="200px"
                src="/assets/team2.png"
                _hover={{ filter: 'drop-shadow(0 6mm 4mm rgb(160, 0, 210))' }}
                alt="asset-team"
              />
            </Box>
          </div>
          <div>
            <Box
              margin="30px 0 50px 0"
              _hover={{ filter: 'drop-shadow(0 2mm 4mm rgb(160, 0, 210))' }}
            >
              <Image
                width="75px"
                height="200px"
                src="/assets/team1.png"
                _hover={{ filter: 'drop-shadow(0 6mm 4mm rgb(160, 0, 210))' }}
                alt="asset-team"
              />
            </Box>
          </div>
          <div>
            <Box
              margin="30px 0 50px 0"
              _hover={{ filter: 'drop-shadow(0 2mm 4mm rgb(160, 0, 210))' }}
            >
              <Image
                width="70px"
                height="200px"
                src="/assets/team3.png"
                _hover={{ filter: 'drop-shadow(0 6mm 4mm rgb(160, 0, 210))' }}
                alt="asset-team"
              />
            </Box>
          </div>
        </Slider>
      </div>
    );
  }
}
