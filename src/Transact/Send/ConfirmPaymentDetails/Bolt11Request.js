import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InputAdornment from '@mui/material/InputAdornment';
import WalletConnection from '../../../WalletConnection';
import BoltIcon from '@mui/icons-material/Bolt';

const walletConnection = new WalletConnection();
export default class Bolt11Request extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			account: {
				address: "",
				availableBalance: 0
			},
			draftPayment: {
				bolt11: "",
				amount_msat: "",
				bolt11Description: "",
				bolt11Payee: ""
			},
			decodedBolt11: {
				bolt11: this.props.paymentRequest.code,
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

		walletConnection.decodeBolt11(this.props.paymentRequest.code).then(response => {

			this.setState({
				decodedBolt11: {
					bolt11: this.props.paymentRequest.code,
					descriptionSet: true,
					description: response.entity.description,
					amount_msatSet: true,
					amount_msat: response.entity.amount_msat,
					bolt11payee: response.entity.payee
				}
			});

			if (response.entity.amount_msat < this.state.account.availableBalance) {
				this.setState({
					sufficientBalance: true,
				});
			}

			this.setState({
				draftPayment: {
					bolt11: this.props.paymentRequest.code,
					amount_msat: response.entity.amount_msat,
					bolt11Description: response.entity.description,
					bolt11Payee: response.entity.payee
				}
			});
		})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}

	handlePay = () => {
		this.props.setPayment(this.state.draftPayment);
	}

	handleReset = () => {
		this.props.handleReset();
	}

	sufficientBalance = () => {
		return true;
	}

	handleChangeAmount = (event) => {
		if (parseInt(event.target.value, 10) && event.target.value > 0) {
			this.setState({
				draftPayment: {
					bolt11: this.state.draftPayment.bolt11,
					amount_msat: event.target.value * 1000,
					bolt11Description: this.state.draftPayment.bolt11Description,
					bolt11Payee: this.state.draftPayment.bolt11Payee
				},
				hasAmountError: false
			});

			if (event.target.value * 1000 < this.state.account.availableBalance) {
				this.setState({
					sufficientBalance: true,
				});
			}
		} else {
			this.setState({
				hasAmountError: true
			});
		}
	};

	render() {

		var sufficientFunds = true;
		var isDisabled = true;

		if (this.state.draftPayment.amount_msat > 0) {

			if (this.state.draftPayment.amount_msat < this.state.account.availableBalance) {
				sufficientFunds = true;
				isDisabled = false;
			} else {
				sufficientFunds = false;
			}
		}

		return (
			<React.Fragment >
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', bgcolor: '' }}>
					<Typography variant="h5" gutterBottom>BOLT 11</Typography>
					<Icon style={{ fontSize: 120, color: 'green' }}>
						<BoltIcon style={{ fontSize: 120, color: 'c7ab00' }} />
					</Icon><br />

					{this.state.decodedBolt11.descriptionSet
						? <div><Typography variant="h5" gutterBottom>{this.state.decodedBolt11.description}</Typography><br /></div>
						: <div />
					}

					{this.state.decodedBolt11.amount_msatSet
						? <div><Typography variant="h4" gutterBottom>{this.state.decodedBolt11.amount_msat / 1000} sats</Typography><br /></div>
						: <div><TextField
							error={this.state.hasAmountError}
							helperText={this.state.hasAmountError ? 'Amount must be greater than 0' : ''}
							onChange={this.handleChangeAmount} id="amount" label="Amount to Send"
							sx={{ m: 1, width: '25ch' }} inputProps={{ inputMode: 'numeric' }}
							InputProps={{ startAdornment: <InputAdornment position="start">sats</InputAdornment>, }} /><br />
						</div>
					}

					{sufficientFunds
						? <div></div>
						: <div><Typography variant="h5" gutterBottom>Insufficient Balance</Typography><br /></div>
					}

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