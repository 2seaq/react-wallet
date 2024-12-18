import * as React from 'react';
import Button from '@mui/material/Button';
import { QrScanner } from '@yudiel/react-qr-scanner';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import NFCReader from './NFCReader';

export default class InvoiceQRScanner extends React.Component {

	constructor(props) {
		super(props);
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		return (
			<React.Fragment>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%'}}>
					<NFCReader onRead={this.props.handleNFCRead} />
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%'}}>
					<QrScanner
						onDecode={this.props.handleDecode}
						onError={(error) => console.log(error?.message)}
					/>
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', paddingBottom: 1}}>
					<TextField onChange={this.props.handleTextInput} id="lnurltextfield" label="Enter Invoice/LNURL" fullWidth />
				</Box>
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
					<Button onClick={this.handleCancel} variant="outlined" endIcon={<HighlightOffIcon />}>
						Cancel
					</Button>
				</Box>
			</React.Fragment>
		)
	}
}