import React, { Component } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import './style.css';

class Keypad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleButtonClick = (num) => {
    this.props.handleNewAmount(num);
  };

  render() {
    return (
      <Container className="App" maxWidth="sm">
        <Box my={4} textAlign="center">
          <Box mt={2} className="keypad">
            <Grid container spacing={2}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map((num, index) => (
                <Grid item xs={4} key={index}>
                  {num === '' ? (
                    <div></div> // This renders an empty grid item
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => this.handleButtonClick(num)}
                      className="keypad-button"
                      fullWidth
                    >
                      {num}
                    </Button>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Keypad;
