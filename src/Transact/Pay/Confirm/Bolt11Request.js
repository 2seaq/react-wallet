import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ButtonGroup, TextField, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InputAdornment from '@mui/material/InputAdornment';
import WalletConnection from '../../../WalletConnection';
import BoltIcon from '@mui/icons-material/Bolt';
import OutboundIcon from '@mui/icons-material/Outbound';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
	Dialog,
	DialogTitle,
	IconButton,
} from '@mui/material';
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
					amount_msatSet: response.entity.amount_msat > 0,
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

	handleCancel = () => {
		this.props.handlePayDialogClose();
	}

	handleStepBack = () => {
		this.props.handleStepBack();
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
				isDisabled = true;
			}
		} 

		if(this.state.hasAmountError) {
				isDisabled = true;
		}

		return (
			<>
				<DialogTitle
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						px: 2,
						mt: 2, width: '100%'
					}}
				>
					<IconButton
						onClick={this.handleStepBack}
						sx={{
							position: 'absolute',
							left: 8,
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
						}}
					>
						<ChevronLeftIcon fontSize="small" />
						<Typography>Back</Typography>
					</IconButton>

					<IconButton
						onClick={this.handleCancel}
						sx={{
							position: 'absolute',
							right: 18,
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
						}}
					>
						<Typography>Cancel</Typography>
					</IconButton>

				</DialogTitle>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						flex: 1,             // ✅ Fill available vertical space				
						maxWidth: 480,
						minWidth: 320,
						mx: 'auto',
					}}
				>
					<Box sx={{ flex: '1 1 auto', width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
						<OutboundIcon style={{ fontSize: 100, color: '#B85FDA' }} />
						<Typography variant="h6">Send Bitcoin</Typography>
					</Box>
					<Box sx={{ flex: '1 1 auto', width: '100%', alignItems: 'left', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
						<Divider sx={{ width: '100%', borderColor: '#eee' }} />
						<Typography >Amount</Typography>

						{this.state.decodedBolt11.amount_msatSet
							? <><Typography gutterBottom>{this.state.decodedBolt11.amount_msat / 1000} sats</Typography><br /></>
							: <><TextField
								error={this.state.hasAmountError}
								placeholder='Enter Amount'
								variant="standard"
								helperText={this.state.hasAmountError ? 'Amount must be greater than 0' : ''}
								onChange={this.handleChangeAmount} id="amount"
								sx={{ m: 0, width: '25ch' }} inputProps={{ inputMode: 'numeric', style: { textAlign: 'left' } }}
								InputProps={{ endAdornment: <InputAdornment position="start">sats</InputAdornment>, }} /><br />
							</>
						}

						<Divider sx={{ width: '100%', borderColor: '#eee' }} />
						<Typography >Description</Typography>
						{this.state.decodedBolt11.descriptionSet
							? <div><Typography gutterBottom>{this.state.decodedBolt11.description}</Typography><br /></div>
							: <div />
						}

						<Divider sx={{ width: '100%', borderColor: '#eee' }} />
						<Typography >To</Typography>
						{this.state.decodedBolt11.descriptionSet
							? <div><Typography gutterBottom>{this.state.decodedBolt11.bolt11payee?.substring(0, 20)}</Typography><br /></div>
							: <div />
						}

						{sufficientFunds
							? <div></div>
							: <div><Typography variant="h6" gutterBottom>Insufficient Balance</Typography><br /></div>
						}

					</Box>
					<Box sx={{ flex: '1 1 auto', width: '100%', alignItems: 'left', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>

						<Button onClick={this.handlePay} disabled={isDisabled} variant="outlined" >
							Send Payment
						</Button>
					</Box>
				</Box>
			</>
		)
	}
}