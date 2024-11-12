import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Keypad from '../../../Utilities/Keypad';
import { WalletContext } from '../../../context/WalletContext';

export default class ChooseInvoiceDetails extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			delay: 100,
			draftinvoice: { amount: 0, description: "React Payment" },
			hasAmountError: false
		};
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleNewAmount = (valueIn) => {
		this.setState((prevState) => ({
			draftinvoice: {
				amount: valueIn,
				description: "React Payment",
			},
		}));
	}

	handleCreateInvoice = () => {
		this.logMessage("INFO", "Create Invoice " + this.state.draftinvoice.amount);
		var milliseconds = new Date().getTime();
		const newInvoice = {};
		newInvoice["amountMsat"] = this.state.draftinvoice.amount * 1000;
		newInvoice["description"] = this.state.draftinvoice.description;
		newInvoice["label"] = milliseconds;
		this.props.createInvoice(newInvoice);
		this.props.handleNext();
	}

	handleReset = () => {
		this.props.handleReset();
	}

	render() {

		return (
			<Box
				display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="75vh"	>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '60%', paddingTop: 2, paddingBottom: 0}}>
					<Typography variant="h4">{this.state.draftinvoice.amount} sats</Typography>
					<Typography variant="h6">{this.state.draftinvoice.description}</Typography>
					<Keypad handleNewAmount={this.handleNewAmount}></Keypad>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '25%', paddingTop: 0 }}>
					{(this.state.draftinvoice.amount === 0 || this.state.draftinvoice.description === "" || this.state.hasAmountError) ? (
						<React.Fragment>
							<ButtonGroup variant="outlined" >
								<Button onClick={this.handleReset} variant="outlined" startIcon={<HighlightOffIcon />}>
									Cancel
								</Button>
								<Button onClick={this.handleCreateInvoice} variant="outlined" disabled endIcon={<SendIcon />}>
									Request
								</Button>
							</ButtonGroup>
						</React.Fragment>
					) : (
						<React.Fragment>
							<ButtonGroup variant="outlined">
								<Button onClick={this.handleReset} variant="outlined" startIcon={<HighlightOffIcon />}>
									Cancel
								</Button>
								<Button onClick={this.handleCreateInvoice} variant="outlined" endIcon={<SendIcon />}>
									Request
								</Button>
							</ButtonGroup>
						</React.Fragment>
					)}
				</Box>
			</Box>
		)
	}
}