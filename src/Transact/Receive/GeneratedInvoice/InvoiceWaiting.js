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

			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" height="65vh" gap={1}  mt={2}>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
					<CountdownTimer seconds={1800} handleExpired={this.handleExpired} />
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '55%'}} gap={1}>
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={modifiedValue}
						viewBox={`0 0 256 256`}
					/>
					<Typography variant="h6">{amountMsatVal/1000} sats</Typography>
					<Typography variant="body">{descriptionVal}</Typography>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }} gap={1}>
					<TextField
						id="outlined-read-only-input"
						value={modifiedValue}
						InputProps={{
							readOnly: true,
						}}
					/>
					<Button onClick={this.handleReset} variant="outlined" endIcon={<HighlightOffIcon />}>
						Close
					</Button>
				</Box>
			</Box>
		)
	}
}