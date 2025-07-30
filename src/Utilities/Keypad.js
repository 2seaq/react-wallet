import React, { Component } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

class Keypad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' // This holds the number input from the keypad
    };
  }

  handleButtonClickOG = (num) => {
    this.setState((prevState) => ({
      value: prevState.value + num // Concatenate the new number
    }), () => {
      // Call a parent function if needed, with the updated value
      this.props.handleNewAmount(this.state.value);
    });
  };

  handleBackspaceOG = () => {
    this.setState((prevState) => ({
      value: prevState.value.slice(0, -1) // Remove the last character
    }), () => {
      // Call a parent function if needed, with the updated value
      this.props.handleNewAmount(this.state.value);
    });
  };

  handleBackspace = () => {
  this.setState((prevState) => {
    const newValue = prevState.value.slice(0, -1);
    return { value: newValue === '' ? '0' : newValue };
  }, () => {
    this.props.handleNewAmount(this.state.value);
  });
};

handleButtonClick = (num) => {
  this.setState((prevState) => {
    const newValue = prevState.value === '0' ? num : prevState.value + num;
    return { value: newValue };
  }, () => {
    this.props.handleNewAmount(this.state.value);
  });
};


  render() {
    return (
      <Container maxWidth="sm">
        <Box my={1.5} textAlign="center">
          <Box mt={0} className="keypad">
            <Grid container spacing={1}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Back', '0'].map((num, index) => (
                <Grid item xs={4} key={index}>
                  {num === 'Back' ? (
                    <Button
                      variant="keypad"
                      onClick={this.handleBackspace}
                      className="keypad-button"
                      fullWidth              
                    >
                      C
                    </Button>
                  ) : (
                    <Button
                      variant="keypad"
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
