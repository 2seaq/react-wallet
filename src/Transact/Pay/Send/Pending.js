import * as React from 'react';
import {
	Box,
	Button,
	Typography,
	Divider
} from '@mui/material';

import OutboundIcon from '@mui/icons-material/Outbound';

export default class Pending extends React.Component {
	constructor(props) {
		super(props);
		this.handleReset = this.handleReset.bind(this);
	}

	handleReset() {
		this.props.handleReset();
	}

	render() {
		const { amount_msat, bolt11Description, bolt11Payee } = this.props.payment;

		return (
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					flex: 1,
					maxWidth: 480,
					minWidth: 320,
					mx: 'auto',
					mt: 12,
				}}
			>
				{/* Sending Icon and Label */}
				<Box
					sx={{
						flex: '0 0 5%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						pb: 3
					}}
				>
					<OutboundIcon sx={{ mb: 2, fontSize: 100, color: '#2D9CDB' }} />
					<Typography variant="h6">Sending...</Typography>
				</Box>

				{/* Payment Info */}
				<Box
					sx={{
						flex: '0 0 auto',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: 1,
					}}
				>
					<Divider sx={{ borderColor: '#eee' }} />
					<Typography variant="body2" color="text.secondary">Amount</Typography>
					<Typography variant="body1">{amount_msat} sats</Typography>

					<Divider sx={{ borderColor: '#eee' }} />
					<Typography variant="body2" color="text.secondary">Description</Typography>
					<Typography variant="body1">{bolt11Description}</Typography>

					<Divider sx={{ borderColor: '#eee' }} />
					<Typography variant="body2" color="text.secondary">To</Typography>
					<Typography variant="body1">{bolt11Payee?.substring(0, 10)}</Typography>
					<Divider sx={{ borderColor: '#eee' }} />
				</Box>

				{/* Done Button */}
				<Box sx={{
					flex: '1 0 auto',
					width: '100%', alignItems: 'left', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', pb: 8
				}}>
					<Button onClick={this.handleReset} variant="outlined" >
						Done
					</Button>
				</Box>
			</Box>
		);
	}
}
