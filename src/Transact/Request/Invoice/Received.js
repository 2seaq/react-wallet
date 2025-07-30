import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Icon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonGroup, TextField, Divider, Grid } from '@mui/material';
import { keyframes } from '@mui/system';

export default class Received extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const modifiedValue = "lightning:" + this.props.createdInvoiceRepsonse.bolt11;
		const amountMsatVal = "" + this.props.createdInvoiceRepsonse.amountMsat;
		const descriptionVal = "" + this.props.createdInvoiceRepsonse.description;


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
					<CheckCircleIcon style={{ fontSize: 80, color: '#34C571' }} />
					<Typography variant="h4">Received!</Typography>
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
					<Button onClick={this.props.handleReset} variant="outlined" >
						Done
					</Button>
				</Box>
			</Box>
		)
	}
}