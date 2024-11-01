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
			draftinvoice: { amount: "", description: "" },
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
				amount: (prevState.draftinvoice?.amount) + valueIn,
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
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '0%', bgcolor: '' }}>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '55%', bgcolor: '' }}>
					<React.Fragment>
						<Typography variant="h2" gutterBottom>{this.state.draftinvoice.amount} sats</Typography>
						<Typography variant="h4" gutterBottom>{this.state.draftinvoice.description}</Typography>
					</React.Fragment>
					<Keypad handleNewAmount={this.handleNewAmount}></Keypad>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '25%', bgcolor: '' }}>
					{(this.state.draftinvoice.amount === 0 || this.state.draftinvoice.description === "" || this.state.hasAmountError) ? (
						<React.Fragment>
							<ButtonGroup variant="contained" aria-label="outlined primary button group">
								<Button onClick={this.handleReset} variant="contained" startIcon={<HighlightOffIcon />}>
									Cancel
								</Button>
								<Button onClick={this.handleCreateInvoice} variant="contained" disabled endIcon={<SendIcon />}>
									Request
								</Button>
							</ButtonGroup>
						</React.Fragment>
					) : (
						<React.Fragment>
							<ButtonGroup variant="contained" aria-label="outlined primary button group">
								<Button onClick={this.handleReset} variant="contained" startIcon={<HighlightOffIcon />}>
									Cancel
								</Button>
								<Button onClick={this.handleCreateInvoice} variant="contained" endIcon={<SendIcon />}>
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