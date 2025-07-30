import * as React from 'react';
import { Box, Typography, Dialog, TextField, InputAdornment, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import Request from './Request/Request';
import Pay from './Pay/Pay';
import WalletConnection from '../WalletConnection';
import { WalletContext } from '../context/WalletContext';
import Keypad from '../Utilities/Keypad';

const walletConnection = new WalletConnection();

export default class Transact extends React.Component {
	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			createdInvoiceResponse: {
				bolt11: "", amountMsat: "", description: "",
				status: "", payment_hash: "", expires_at: ""
			},
			draftInvoice: { amount: 0, description: "" },
			requestDialogOpen: false,
			payDialogOpen: false,
			activeStep: 0,
		};
	}

	// Logging
	logMessage = (type, message) => {
		this.context.log(type, message);
	};

	// Input Handling
	handleNewAmount = (value) => {
		this.setState(prev => ({
			draftInvoice: { ...prev.draftInvoice, amount: value }
		}));
	};

	handleDescriptionChange = (event) => {
		this.setState(prev => ({
			draftInvoice: { ...prev.draftInvoice, description: event.target.value }
		}));
	};

	// Dialog Handling
	handleRequestDialogOpen = () => {
		this.logMessage("INFO", "Opening Request Dialog");
		this.setState({ requestDialogOpen: true }, this.handleCreateInvoice);
	};

	handleRequestDialogClose = () => {
		this.setState({ requestDialogOpen: false });
	};

	handlePayDialogOpen = () => {
		this.logMessage("INFO", "Opening Pay Dialog");
		this.setState({ payDialogOpen: true });
	};

	handlePayDialogClose = () => {
		this.setState({ payDialogOpen: false });
	};

	// Workflow Navigation
	handleNext = () => {
		this.setState(prev => ({ activeStep: prev.activeStep + 1 }));
	};

	handleReset = () => {
		this.logMessage("INFO", "Resetting Transact UI");
		this.setState({
			activeStep: 0,
			draftInvoice: { amount: 0, description: "" },
			createdInvoiceResponse: {
				bolt11: "", amountMsat: "", description: "",
				status: "", payment_hash: "", expires_at: ""
			},
		});
	};

	// Invoice Handling
	handleCreateInvoice = () => {
		const { amount, description } = this.state.draftInvoice;
		const label = Date.now();

		const invoice = {
			amountMsat: amount * 1000,
			description: description || "Lightning Payment Request",
			label: label
		};

		this.logMessage("INFO", `Creating Invoice: ${invoice.amountMsat} msats - ${invoice.description}`);

		walletConnection.createInvoice(invoice)
			.then(res => {
				const entity = res.entity;
				this.setState({
					createdInvoiceResponse: {
						bolt11: entity.bolt11,
						amountMsat: entity.amountMsat,
						description: entity.description,
						status: entity.status,
						payment_hash: entity.payment_hash,
						expires_at: entity.expires_at
					}
				});
			})
			.catch(err => {
				this.logMessage("ERR", `Failed to create invoice: ${err.message}`);
			});
	};

	// Render
	render() {
		const { draftInvoice, createdInvoiceResponse, requestDialogOpen, payDialogOpen } = this.state;
		const isRequestDisabled = draftInvoice.amount <= 0;

		return (
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: '1 1 auto',
				maxWidth: 480,
				mx: 'auto',
				height: '100%',
			}}>

				{/* Request Dialog */}
				<Dialog open={requestDialogOpen} onClose={this.handleRequestDialogClose}
					fullScreen={false} hideBackdrop={false}
					PaperProps={dialogPaperProps}>
					<Request
						handleRequestDialogClose={this.handleRequestDialogClose}
						createdInvoiceRepsonse={createdInvoiceResponse}
						resetCreateInvoiceResponse={this.handleReset}
						handleReset={this.handleReset}
					/>
				</Dialog>

				{/* Pay Dialog */}
				<Dialog open={payDialogOpen} onClose={this.handlePayDialogClose}
					fullScreen={false} hideBackdrop={false}
					PaperProps={dialogPaperProps}>
					<Pay
						handlePayDialogClose={this.handlePayDialogClose}
						createdInvoiceRepsonse={createdInvoiceResponse}
						resetCreateInvoiceResponse={this.handleReset}
						handleReset={this.handleReset}
					/>
				</Dialog>

				{/* Amount & Description */}
				<Box sx={{
					flex: '1 1 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Typography variant="h4" sx={{ fontWeight: 400 }}>
						{draftInvoice.amount} sats
					</Typography>
					<TextField
						variant="standard"
						placeholder="Add note..."
						value={draftInvoice.description}
						onChange={this.handleDescriptionChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EditIcon sx={{ fontSize: 18 }} />
								</InputAdornment>
							)
						}}
						inputProps={{ size: 8,  style: { textAlign: 'left' } }}
					/>
				</Box>

				{/* Keypad */}
				<Box sx={{ flex: '1 1 auto', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
					<Keypad handleNewAmount={this.handleNewAmount} />
				</Box>

				{/* Action Buttons */}
				<Box display="flex" gap={2} sx={{ flex: '1 1 auto', px: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
					<Button
						onClick={this.handleRequestDialogOpen}
						disabled={isRequestDisabled}
						variant="outlined"
						sx={{ flex: 1 }}>
						Request
					</Button>
					<Button
						onClick={this.handlePayDialogOpen}
						variant="outlined"
						sx={{ flex: 1 }}>
						Pay
					</Button>
				</Box>
			</Box>
		);
	}
}

// Dialog styling reused across both dialogs
const dialogPaperProps = {
	sx: {
		position: 'fixed',
		bottom: 0,
		left: '50%',
		transform: 'translateX(-50%)',
		width: '100vw',
		height: '95vh',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		m: 0,
	}
};
