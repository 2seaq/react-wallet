import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { getParams } from 'js-lnurl';
import WalletConnection from '../../../WalletConnection';
import Keypad from '../../../Utilities/Keypad';
import { WalletContext } from '../../../context/WalletContext';

const walletConnection = new WalletConnection();
export default class LNURLRequest extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);

		this.state = {
			account: {
				address: "",
				availableBalance: 0
			},
			decodedlnurl: {
				lnurl: this.props.paymentRequest.code,
				tag: "",
				callback: "",
				domain: "",
				minSendable: 0,
				maxSendable: 0,
				metadata: "",
				commentAllowed: 0
			},
			draftPayment: {
				bolt11: "",
				amount_msat: "",
				bolt11Description: "",
				bolt11Payee: ""
			},
			decodedBolt11: {
				bolt11: "",
				descriptionSet: false,
				description: "",
				amount_msatSet: false,
				amount_msat: "",
				bolt11payee: ""
			},
			hasAmountError: false,
			sufficientBalance: false,
		};

	}

	componentDidMount() {
		console.log("App - Transact - Debit - Bolt11Request - componentDidMount Called ");
		walletConnection.getAccount().then(response => {
			this.setState({
				account: {
					address: response.entity.address,
					availableBalance: response.entity.availableBalance
				}
			});
		})
			.catch(error => {
				console.error('Error fetching data:', error);
			});

		// Decode LNURL
		getParams(this.props.paymentRequest.code)
			.then(params => {
				switch (params.tag) {
					case 'payRequest':
						console.log("decodeLNURL - payRequest");
						console.log("decodeLNURL - payRequest callback " + params.callback);
						console.log("decodeLNURL - payRequest minSendable " + params.minSendable);
						console.log("decodeLNURL - payRequest domain " + params.domain);

						this.setState({
							decodedlnurl: {
								lnurl: this.state.decodedlnurl.lnurl,
								tag: params.tag,
								callback: params.callback,
								domain: params.domain,
								minSendable: params.minSendable,
								maxSendable: params.maxSendable,
								metadata: params.metadata,
								commentAllowed: params.commentAllowed
							}
						});
						break
				}
			})
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};


	makeLNURLPayRequest = (amount_msatIn, commentIn) => {

		console.log("App - Transact - PaymentWorkflow - getLNURLInvoice");

		const apiUrl = this.state.decodedlnurl.callback; // Replace with your API endpoint
		const params = {
			//		  amount: this.props.draftpay.amount_msat
			amount: amount_msatIn,
			comment: commentIn
		};

		// Convert the params object into a query string
		const queryString = Object.keys(params)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
			.join('&');

		// Append the query string to the API URL
		const urlWithParams = `${apiUrl}?${queryString}`;
		console.log("App - getLNURLInvoice CREATED FETCH STRING " + urlWithParams);

		return new Promise((resolve, reject) => {
			fetch(urlWithParams).then(response => {
				if (response.ok) {
					// Parse the JSON response
					resolve(response.json());
				} else {
					resolve(response.status);
					// Handle error responses
				}

			});
		});

	}


	handleLNURLPayRequestResponse = (responseIn) => {

		console.log("App - Transact - Debit - LNURLRequest - handleLNURLPayRequestResponse Called ");

		walletConnection.decodeBolt11(responseIn.pr).then(response => {

			console.log("App - Transact - Debit - LNURLRequest - componentDidMount Called  decodeBolt11 Descirptions " + response.entity.description);
			console.log("App - Transact - Debit - LNURLRequest - componentDidMount Called  decodeBolt11 amount_msat " + response.entity.amount_msat);
			console.log("App - Transact - Debit - LNURLRequest - componentDidMount Called  state decodeBolt11  " + this.state.decodedBolt11.amount_msat);
			console.log("App - Transact - Debit - LNURLRequest - componentDidMount Called  decodeBolt11 bolt11payee " + response.entity.payee);
			console.log("App - Transact - Debit - LNURLRequest - componentDidMount Called  decodeBolt11 description " + response.entity.description);

			this.setState({
				decodedBolt11: {
					bolt11: responseIn.pr,
					description: response.entity.description,
					amount_msat: response.entity.amount_msat,
					bolt11payee: response.entity.payee
				}
			});

			if (response.entity.amount_msat < this.state.account.availableBalance) {
				this.setState({
					sufficientBalance: true,
				});
			}
			console.log("App - response.entity.amount_msat != 0 response.entity.amount_msat " + response.entity.amount_msat);


			// TODO ADD ALL SITUATIONS WHERE THE DRAFT IS SET..
			//		if(response.entity.amount_msat!="0"){
			console.log("App - response.entity.amount_msat != 0 " + this.state.draftPayment.amount_msat);

			this.setState({
				draftPayment: {
					bolt11: responseIn.pr,
					amount_msat: response.entity.amount_msat,
					bolt11Description: response.entity.description,
					bolt11Payee: response.entity.payee
				}
			});

			console.log("App - response.entity.amount_msat != 0 " + this.state.draftPayment.amount_msat);
			//		}

			console.log("App - Transact - Debit - Bolt11Request - componentDidMount Called  state decodeBolt11  " + this.state.decodedBolt11.amount_msat);
			console.log("App - Transact - Debit - Bolt11Request - componentDidMount Called  state decodeBolt11 amount_msat " + this.state.draftPayment.amount_msat);

		})
			.catch(error => {
				console.error('Error fetching data:', error);
			});

	}


	handleChangeAmount = (event) => {
		console.log("App - Transact - PaymentWorkflow - Bolt11WithoutValueRequest - handleChangeAmount Called ");
		if (parseInt(event.target.value, 10) && event.target.value > 0) {
			this.setState({
				hasAmountError: false,
				draftPayment: {
					amount_msat: event.target.value * 1000
				}
			});

			//	const jsonresponse = this.makeLNURLPayRequest(event.target.value*1000,"Osys Payment");
			//	this.handleLNURLPayRequestResponse(jsonresponse);
			this.makeLNURLPayRequest(event.target.value * 1000, "Osys Payment").then(response => { this.handleLNURLPayRequestResponse(response) });
		} else {
			this.setState({
				hasAmountError: true,
			});
		}
	};

	handleChangeComment = (event) => {
		console.log("App - Transact - PaymentWorkflow - Bolt11WithoutValueRequest - handleChangeComment Called ");
		if (event.target.value !== "") {
			this.setState({
				hasCommentError: false,
			});
			//	  const jsonresponse =  this.makeLNURLPayRequest(event.target.value*1000,"Osys Payment");
			//	  this.handleLNURLPayRequestResponse(jsonresponse);		  
			this.makeLNURLPayRequest(this.state.draftPayment.amount_msat, event.target.value).then(response => { this.handleLNURLPayRequestResponse(response) });

		} else {
			this.setState({
				hasCommentError: true,
			});
		}
	};

	handleNewAmount = (valueIn) => {

		this.logMessage("INFO", "Val Updated " + valueIn);

		this.setState((prevState) => ({
			draftPayment: {
				amount_msat: (prevState.draftPayment?.amount_msat) + valueIn,
				description: "React Payment",
			},
		}));

	}

	handlePay = () => {
		//this.props.setPayment(this.state.draftPayment.invoice,this.state.draftPayment.amount_msat);
		this.props.setPayment(this.state.draftPayment);

		console.log("App - Transact - HANDLEPAY");

		console.log("bolt11 " + this.state.draftPayment.bolt11);
		console.log("amount_msat " + this.state.draftPayment.amount_msat);
		console.log("bolt11Description " + this.state.draftPayment.bolt11Description);
		console.log("bolt11Payee " + this.state.draftPayment.bolt11Payee);

	}


	handleReset = () => {
		this.props.handleReset();
	}


	render() {

		var valmsats = this.state.draftPayment.amount_msat;
		var valsats = valmsats / 1000;

		function isStringSet(str) {
			return str !== undefined && str !== null && str !== '';
		}

		function getValueOfTextPlain(dataArray) {
			for (var i = 0; i < dataArray.length; i++) {
				if (dataArray[i][0] === "text/plain") {
					return dataArray[i][1];
				}
			}
			return null; // Return null if "text/plain" is not found
		}


		if (Number.isNaN(valsats)) {
			valsats = 0;
		}

		//	if (isStringSet(this.props.decodedBolt11.description)) {
		//		var description = this.props.decodedBolt11.description.substring(0,20);
		//	} else {
		//		var description = "No Description";
		//	}

		console.log("A lnurljpeg " + lnurljpeg);
		console.log("A lnurlpng " + lnurlpng);

		if (isStringSet(this.state.decodedlnurl.metadata)) {
			var metadatablock = this.state.decodedlnurl.metadata;
			var validJsonString = metadatablock.replace(/'/g, '"');
			var parsedArray = JSON.parse(validJsonString);
			var description = parsedArray[0][0];

			for (var i = 0; i < parsedArray.length; i++) {
				if (parsedArray[i][0] === "text/plain") {
					var description = parsedArray[i][1];
				}
				if (parsedArray[i][0] === "text/long-desc") {
					var longdescription = parsedArray[i][1];
				}
				if (parsedArray[i][0] === "image/png;base64") {
					var lnurlpng = parsedArray[i][1];
				}
				if (parsedArray[i][0] === "image/jpeg;base64") {
					var lnurljpeg = parsedArray[i][1];
				}
			}
		}

		console.log("B lnurljpeg " + lnurljpeg);
		console.log("B lnurlpng " + lnurlpng);

		if (isStringSet(this.state.draftPayment.bolt11)) {
			var bolt11 = this.state.draftPayment.bolt11.substring(0, 20);
		} else {
			var bolt11 = "";
		}

		var sufficientFunds = true;
		var isDisabled = true;

		console.log("sufficientFunds " + sufficientFunds);
		console.log("isDisabled " + isDisabled);
		console.log("this.state.draftPayment.amount_msat " + this.state.draftPayment.amount_msat);

		if (this.state.draftPayment.amount_msat > 0) {

			console.log("this.state.draftPayment.amount_msat > 0 ");

			if (this.state.draftPayment.amount_msat < this.state.account.availableBalance) {
				console.log("this.state.draftPayment.amount_msat < this.state.account.availableBalance");

				sufficientFunds = true;
				isDisabled = false;
			} else {
				console.log("this.state.draftPayment.amount_msat > this.state.account.availableBalance");
				sufficientFunds = false;
			}
		}

		console.log("sufficientFunds " + sufficientFunds);
		console.log("isDisabled " + isDisabled);

		return (
			<React.Fragment>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ padding: 0, width: '100%', bgcolor: '' }}>LNURL
					{lnurljpeg !== undefined
						? <div><img src={`data:image/jpeg;base64,${lnurljpeg}`} /></div>
						: <div />
					}
					{lnurlpng !== undefined
						? <div><img src={`data:image/png;base64,${lnurlpng}`} /></div>
						: <div />
					}
					{lnurlpng === undefined && lnurljpeg === undefined
						? <div><Icon style={{ fontSize: 80, color: 'green' }}><AccountCircleIcon style={{ fontSize: 80, color: 'green' }} /></Icon></div>
						: <div />
					}
					<br />
					<Typography variant="body1" gutterBottom>{description}</Typography>
					<Typography variant="body1" gutterBottom>{longdescription}</Typography>
					<Typography variant="body1" gutterBottom>{bolt11}</Typography>
					<Typography variant="h6" gutterBottom>{this.state.draftPayment.amount_msat} Sats</Typography>
					{this.state.decodedlnurl.commentAllowed !== 'undefined'
						? <div>	<TextField error={this.state.hasCommentError} helperText={this.state.hasCommentError ? 'Comment too long' : ''} onChange={this.handleChangeComment} id="comment" label="Comment to Send" sx={{ m: 1, width: '25ch' }} InputProps={{ startAdornment: <InputAdornment position="start">comment</InputAdornment>, }} /></div>
						: <div />
					}
					<Keypad handleNewAmount={this.handleNewAmount}></Keypad>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '25%', bgcolor: '' }}>
					<ButtonGroup>
						<Button onClick={this.handleReset} variant="contained" startIcon={<HighlightOffIcon />}>
							Cancel
						</Button>
						<Button onClick={this.handlePay} variant="contained" disabled={isDisabled} endIcon={<SendIcon />}>
							Pay
						</Button>
					</ButtonGroup>
				</Box>
			</React.Fragment>
		)
	}
}