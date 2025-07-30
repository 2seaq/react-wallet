import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import QRCode from "react-qr-code";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CountdownTimer from '../CountdownTimer';
import { WalletContext } from '../../../context/WalletContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
	Dialog,
	DialogTitle,
	IconButton,
} from '@mui/material';

export default class Waiting extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			snackBarOpen: false
		};
	}

	handleReset = () => {
		this.props.handleReset();
	}

	handleExpired = () => {
		this.props.handleExpired();
	}

	handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(this.props.createdInvoiceRepsonse.bolt11);
			this.handleOpen();

		} catch (err) {
			console.error('Failed to copy!', err);
		}

	}

	handleOpen = () => {
		this.setState({ snackBarOpen: true });
	}

	handleClose = () => {
		this.setState({ snackBarOpen: false });
	}

	render() {

		const modifiedValue = "lightning:" + this.props.createdInvoiceRepsonse.bolt11;
		const amountMsatVal = "" + this.props.createdInvoiceRepsonse.amountMsat;
		const descriptionVal = "" + this.props.createdInvoiceRepsonse.description;

		return (
<React.Fragment>
									<DialogTitle
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								px: 2,
								mt: 2,
							}}
						>
							<IconButton
								onClick={this.props.handleReset}
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

							<Typography variant="h6" component="div">
								{/* Title */}
							</Typography>
						</DialogTitle>

			
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,             // ✅ Fill available vertical space				
					maxWidth: 480,
					mx: 'auto',
				}}
			>
				<Box sx={{ flex: '0 0 20%', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center',maxWidth: 280,gap: 2, }}>
					<Typography color="text.secondary">
						Share payment request
					</Typography>
					<Typography >
						Keep the app open until the payment is received.
					</Typography>
					<Typography >
						Expires in: <CountdownTimer seconds={1800} handleExpired={this.handleExpired} />
					</Typography>
				</Box>
				<Box sx={{ flex: '0 0 50%', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={modifiedValue}
						viewBox={`0 0 256 256`}
					/>
				</Box>
				<Box sx={{ flex: '0 0 30%', justifyContent: 'center', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
					<Button onClick={this.handleCopy} variant="copy" endIcon={<ContentCopyIcon />}>
						Copy
					</Button>
					<Snackbar
						open={this.state.snackBarOpen}
						autoHideDuration={2000}
						onClose={this.handleClose}
						message="Copied to clipboard!"
					/>
					{this.state.snackBarOpen}
				</Box>
			</Box>
			</React.Fragment>
		)
	}
}