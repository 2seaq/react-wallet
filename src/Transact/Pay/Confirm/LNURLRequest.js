import React, { Component } from 'react';
import { Button, ButtonGroup, TextField, Box, Typography, Icon, InputAdornment } from '@mui/material';
import { Send as SendIcon, HighlightOff as HighlightOffIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { getParams } from 'js-lnurl';
import WalletConnection from '../../../WalletConnection';
import Keypad from '../../../Utilities/Keypad';
import { WalletContext } from '../../../context/WalletContext';

const walletConnection = new WalletConnection();

class LNURLRequest extends Component {
  static contextType = WalletContext;

  constructor(props) {
    super(props);
    this.state = {
      account: { address: "", availableBalance: 0 },
      decodedlnurl: {
        lnurl: props.paymentRequest.code, tag: "", callback: "", domain: "",
        minSendable: 0, maxSendable: 0, metadata: "", commentAllowed: 0
      },
      draftPayment: { bolt11: "", amount_msat: "", bolt11Description: "", bolt11Payee: "" },
      decodedBolt11: { bolt11: "", description: "", amount_msat: "", bolt11payee: "" },
      hasAmountError: false,
      sufficientBalance: false,
    };
  }

  componentDidMount() {
    walletConnection.getAccount()
      .then(({ entity }) => this.setState({ account: { address: entity.address, availableBalance: entity.availableBalance } }))
      .catch(error => console.error('Error fetching data:', error));

    getParams(this.props.paymentRequest.code).then(params => {
      if (params.tag === 'payRequest') {
        this.setState(prevState => ({
          decodedlnurl: { ...prevState.decodedlnurl, ...params }
        }));
      }
    });
  }

  logMessage = (type, message) => this.context.log(type, message);

  makeLNURLPayRequest = (amount_msat, comment) => {
    const { callback } = this.state.decodedlnurl;
    const params = new URLSearchParams({ amount: amount_msat, comment }).toString();
    return fetch(`${callback}?${params}`)
      .then(response => response.ok ? response.json() : Promise.reject(response.status));
  };

  handleLNURLPayRequestResponse = (response) => {
    walletConnection.decodeBolt11(response.pr).then(({ entity }) => {
      const sufficientBalance = entity.amount_msat < this.state.account.availableBalance;
      this.setState({
        decodedBolt11: { ...entity, bolt11: response.pr },
        draftPayment: { ...entity, bolt11: response.pr },
        sufficientBalance
      });
    }).catch(error => console.error('Error decoding bolt11:', error));
  };

  handleAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10) * 1000;
    if (amount > 0) {
      this.setState({ hasAmountError: false });
      this.makeLNURLPayRequest(amount, "Osys Payment")
        .then(this.handleLNURLPayRequestResponse);
    } else {
      this.setState({ hasAmountError: true });
    }
  };

  handleCommentChange = (event) => {
    const comment = event.target.value;
    if (comment) {
      this.setState({ hasCommentError: false });
      this.makeLNURLPayRequest(this.state.draftPayment.amount_msat, comment)
        .then(this.handleLNURLPayRequestResponse);
    } else {
      this.setState({ hasCommentError: true });
    }
  };

  handleNewAmount = (value) => {
    this.logMessage("INFO", `Val Updated ${value}`);
    this.setState({ draftPayment: { amount_msat: value*1000, description: "React Payment" } });
  };

  handlePay = () => {
    this.props.setPayment(this.state.draftPayment);
  };

  renderMetadataContent = () => {
    const { metadata } = this.state.decodedlnurl;
    if (!metadata) return {};

    const parsedArray = JSON.parse(metadata.replace(/'/g, '"'));
    const findContent = (type) => parsedArray.find(([key]) => key === type)?.[1] || "";

    return {
      description: findContent("text/plain"),
      longDescription: findContent("text/long-desc"),
      lnurlpng: findContent("image/png;base64"),
      lnurljpeg: findContent("image/jpeg;base64"),
    };
  };

  render() {
    const { amount_msat } = this.state.draftPayment;
    const { description, longDescription, lnurlpng, lnurljpeg } = this.renderMetadataContent();
    const isDisabled = !(amount_msat > 0 && amount_msat < this.state.account.availableBalance);

    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ padding: 0, width: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '90%' }}>
        <Box  mr={2}>
          {lnurljpeg ? <img src={`data:image/jpeg;base64,${lnurljpeg}`} alt="JPEG" /> : lnurlpng ? <img src={`data:image/png;base64,${lnurlpng}`} alt="PNG" /> :
            <Icon style={{ fontSize: 80, color: 'green' }}><AccountCircleIcon style={{ fontSize: 80, color: 'orange' }} /></Icon>}
        </Box>
        <Typography>{description}</Typography>
        <Typography>{longDescription}</Typography>
        </Box>
        <Typography>{this.state.draftPayment.bolt11}</Typography>
        <Typography variant="h6" gutterBottom>{amount_msat/1000} Sats</Typography>

        {this.state.decodedlnurl.commentAllowed !== 'undefined' && (
          <TextField
            error={this.state.hasCommentError}
            helperText={this.state.hasCommentError ? 'Comment too long' : ''}
            onChange={this.handleCommentChange}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{ startAdornment: <InputAdornment position="start">comment</InputAdornment> }}
          />
        )}
        <Keypad handleNewAmount={this.handleNewAmount} />
        <Box display="flex" justifyContent="center" width="100%">
            <Button onClick={this.props.handleReset} startIcon={<HighlightOffIcon />}>Cancel</Button>
            <Button onClick={this.handlePay} disabled={isDisabled} endIcon={<SendIcon />}>Pay</Button>
        </Box>
      </Box>
    );
  }
}

export default LNURLRequest;
