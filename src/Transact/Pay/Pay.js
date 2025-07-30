import * as React from 'react';
import Box from '@mui/material/Box';
import Input from './Input/Input';
import Confirm from './Confirm/Confirm';
import Send from './Send/Send';
import { WalletContext } from '../../context/WalletContext';

export default class Pay extends React.Component {
  static contextType = WalletContext;

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      paymentRequest: {
        code: "",
        type: ""
      },
      payment: {
        bolt11: "",
        amount_msat: "",
        bolt11Description: "",
        bolt11Payee: "",
        status: "unset"
      }
    };
  }

  // Logging
  logMessage = (type, message) => {
    this.context.log(type, message);
  };

  // State Updaters
  setPayRequest = (code, type) => {
    this.logMessage("INFO", `Set Pay Request: ${type}`);
    this.setState({
      activeStep: 1,
      paymentRequest: { code, type }
    });
  };

  setPayment = (payment) => {
    this.setState({
      activeStep: 2,
      payment: {
        bolt11: payment.bolt11,
        amount_msat: payment.amount_msat,
        bolt11Description: payment.bolt11Description,
        bolt11Payee: payment.bolt11Payee,
        status: "draft"
      }
    });
  };

  // Navigation
  handleReset = () => {
    this.logMessage("INFO", "Resetting Pay Flow");
    this.setState({
      activeStep: 0,
      paymentRequest: { code: "", type: "" },
      payment: {
        bolt11: "",
        amount_msat: "",
        bolt11Description: "",
        bolt11Payee: "",
        status: "unset"
      }
    });
    this.props.handleReset?.();
    this.props.handlePayDialogClose?.();
  };

  handleStepBack = () => {
    this.setState({
      activeStep: 0,
      paymentRequest: { code: "", type: "" },
      payment: {
        bolt11: "",
        amount_msat: "",
        bolt11Description: "",
        bolt11Payee: "",
        status: "unset"
      }
    });
  };

  renderStepContent = () => {
    const { activeStep, paymentRequest, payment } = this.state;
    const { handlePayDialogClose } = this.props;

    const steps = [
      <Input
        handlePayDialogClose={handlePayDialogClose}
        handleCancel={this.handleReset}
        setPayRequest={this.setPayRequest}
      />,
      <Confirm
        handleStepBack={this.handleStepBack}
        paymentRequest={paymentRequest}
        handlePayDialogClose={handlePayDialogClose}
        handleReset={this.handleReset}
        setPayment={this.setPayment}
      />,
      <Send
        payment={payment}
        handleReset={this.handleReset}
      />
    ];

    return steps[activeStep];
  };

  render() {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {this.renderStepContent()}
      </Box>
    );
  }
}
