import * as React from 'react';
import Success from './Success';
import Fail from './Fail';
import Pending from './Pending';

import WalletConnection from '../../../WalletConnection';
import { WalletContext } from '../../../context/WalletContext';

const walletConnection = new WalletConnection();

export default class Send extends React.Component {
  static contextType = WalletContext;

  constructor(props) {
    super(props);
    this.state = {
      sentPayResponse: {
        bolt11: "",
        amountMsat: "",
        timestamp: "",
        bolt11description: "",
        status: "",
        bolt11Payee: ""
      }
    };
  }

  componentDidMount() {
    const { payment } = this.props;
    this.logMessage("INFO", "Initiating payment...");

    walletConnection.sendPay(payment)
      .then(response => {
        const data = response.entity;

        this.setState({
          sentPayResponse: {
            bolt11: data.bolt11,
            amountMsat: data.amountMsat,
            timestamp: data.timestamp,
            bolt11description: data.bolt11description,
            status: data.status || 'success', // fallback for internal
            bolt11Payee: data.bolt11Payee
          }
        });

        this.logMessage("INFO", `Bolt11: ${data.bolt11}`);
        this.logMessage("INFO", `Amount: ${data.amountMsat}`);
        this.logMessage("INFO", `Description: ${data.bolt11description}`);
        this.logMessage("INFO", `Status: ${data.status}`);
      })
      .catch(error => {
        this.logMessage("ERR", `Payment failed: ${error.message}`);
        this.setState({
          sentPayResponse: {
            ...this.state.sentPayResponse,
            status: "failure"
          }
        });
      });
  }

  logMessage = (type, message) => {
    this.context.log(type, message);
  };

  handleReset = () => {
    this.props.handleReset();
  };

  render() {
    const { sentPayResponse } = this.state;
    const { payment } = this.props;

    switch (sentPayResponse.status) {
      case 'success':
      case 'internalsuccess':
        return <Success payment={payment} handleReset={this.handleReset} />;
      case 'failure':
        return <Fail payment={payment} handleReset={this.handleReset} />;
      default:
        return <Pending payment={payment} handleReset={this.handleReset} />;
    }
  }
}
