import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Icon } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import CancelIcon from '@mui/icons-material/Cancel';
import { ButtonGroup, TextField, Divider, Grid } from '@mui/material';

export default class Expired extends React.Component  {

	constructor(props) {
		super(props);
		this.handleReset= this.handleReset.bind(this)
	}

	handleReset = () => {
		this.props.handleReset();
    }

	render() {

		return (
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
				<Box sx={{ flex: '0 0 30%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
					<CancelIcon style={{ fontSize: 80, color: '#EB5757'}} />
					<Typography variant="h4">Failed</Typography>
				</Box>
				<Box sx={{ flex: '0 0 45%', width: '100%', alignItems: 'left', justifyContent: 'top', display: 'flex', flexDirection: 'column', gap: 2,}}>
					<Divider sx={{ width: '100%', borderColor: '#eee' }} />
					<Grid container>
						<Grid item xs={12}>
							<Typography style={{ color: '#00000046' }}>Amount</Typography>
						</Grid>
						<Grid item xs={7}>
							<Typography>+{this.props.createdInvoiceRepsonse.amountMsat} sats</Typography>
						</Grid>
						<Grid item xs={5} textAlign="right">
							<Typography></Typography>
						</Grid>
					</Grid>
					<Divider sx={{ width: '100%', borderColor: '#eee' }} />
					<Grid container>
						<Grid item xs={12}>
							<Typography style={{ color: '#00000046' }}>Description</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>{this.props.createdInvoiceRepsonse.description}</Typography>
						</Grid>
					</Grid>
				</Box>				
				<Box sx={{ flex: '0 0 25%', justifyContent: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
					<Button onClick={this.handleReset} variant="outlined" >
						Done
					</Button>
				</Box>
			</Box>
		)
	}
}
