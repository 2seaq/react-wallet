import * as React from 'react';
import {
	Box,
	Button,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
	InputAdornment
} from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';

import { WalletContext } from '../../../context/WalletContext';
import NFCReader from './NFCReader';

export default class Input extends React.Component {
	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			draftPayBolt11: "",
			draftPayAmountMsat: 0
		};
	}

	// Logging
	logMessage = (type, message) => {
		this.context.log(type, message);
	};

	// Input Decoding
	extractBolt11FromText = (text) => {
		const lower = text.toLowerCase();
		if (lower.includes("lnbc") || lower.includes("lntb")) {
			const prefix = lower.includes("lnbc") ? "lnbc" : "lntb";
			const start = lower.indexOf(prefix);
			return ["BOLT11", text.slice(start)];
		}
		return null;
	};

	handleDecode = (data) => {
		if (!data) return;

		this.logMessage("INFO", "Decoded input: " + data.slice(0, 10));
		const result = this.extractBolt11FromText(data);

		if (result && result[0] === "BOLT11") {
			this.logMessage("INFO", "Detected BOLT11 invoice.");
			this.props.setPayRequest(result[1], "BOLT11");
		}
	};

	// Event Handlers
	handleTextInput = (event) => {
		this.handleDecode(event.target.value);
	};

	handleNFCRead = (value) => {
		this.handleDecode(value);
	};

	handleClipboardPaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			this.handleDecode(text);
		} catch (err) {
			this.logMessage("ERR", "Failed to read clipboard: " + err.message);
		}
	};

	render() {
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
						onClick={this.props.handlePayDialogClose}
						sx={{ position: 'absolute', left: 8 }}
					>
						<ChevronLeftIcon fontSize="small" />
						<Typography>Back</Typography>
					</IconButton>
				</DialogTitle>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						minWidth: 400,
						height: '100%',
						justifyContent: 'center',
					}}
				>
					<Box sx={{ flex: '0 0 5%', textAlign: 'center' }}>
						<Typography color="text.secondary">Scan QR Code</Typography>
					</Box>

					<Box sx={{ flex: '0 0 5%' }}>
						<NFCReader onRead={this.handleNFCRead} />
					</Box>

					<Box sx={{ flex: '0 0 60%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
						<QrScanner
							onDecode={this.handleDecode}
							onError={(error) => this.logMessage("ERR", error?.message)}
						/>
					</Box>

					<Box sx={{ flex: '0 0 20%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>            <Button
						variant="copy"
						onClick={this.handleClipboardPaste}
						startIcon={<ContentCopyIcon />}
					>
						Paste from Clipboard
					</Button>
					</Box>
				</Box>
			</>
		);
	}
}
