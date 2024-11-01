import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import QRCode from "react-qr-code";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CountdownTimer from '../CountdownTimer';
import { WalletContext } from '../../../context/WalletContext';


export default class InvoiceWaiting extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
	}

	handleReset = () => {
		this.props.handleReset();
	}

	handleExpired = () => {
		this.props.handleExpired();
	}

	render() {

		const modifiedValue = "lightning:" + this.props.createdInvoiceRepsonse.bolt11;
		const amountMsatVal = "" + this.props.createdInvoiceRepsonse.amountMsat;
		const descriptionVal = "" + this.props.createdInvoiceRepsonse.description;

		return (

			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="70vh"	>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '10%', bgcolor: '' }}>
					<Typography variant="h6" gutterBottom>Payment Request QR Code</Typography><CountdownTimer seconds={1800} handleExpired={this.handleExpired} />
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '55%', bgcolor: '' }}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={modifiedValue}
						viewBox={`0 0 256 256`}
					/>
					<br />
					<Typography variant="h7" gutterBottom>{amountMsatVal/1000} sats</Typography>
					<Typography variant="h7" gutterBottom>{descriptionVal}</Typography>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', bgcolor: '' }}>
					<TextField
						id="outlined-read-only-input"
						label="Bolt11"
						value={modifiedValue}
						InputProps={{
							readOnly: true,
						}}
					/><br />
					<Button onClick={this.handleReset} variant="contained" endIcon={<HighlightOffIcon />}>
						Close
					</Button>
				</Box>
			</Box>
		)
	}
}