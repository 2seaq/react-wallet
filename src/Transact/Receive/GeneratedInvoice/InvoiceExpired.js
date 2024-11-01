import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Icon } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

export default class InvoiceExpired extends React.Component  {

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
			display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="75vh" >

					<React.Fragment> 		
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '85%', bgcolor: ''}}>
					<Icon style={{ fontSize: 100, color: 'green' }}>
					<AccessAlarmsIcon style={{ fontSize: 100, color: 'red' }} />	
					</Icon><br/>
					<Typography variant="h6" gutterBottom color="success">Payment Expired</Typography>
					</Box>		
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '15%', bgcolor: ''}}>
					<Button onClick={this.handleReset} variant="contained" endIcon={<HighlightOffIcon />}>
							Close
						</Button>
					</Box>
					</React.Fragment> 		
			</Box>
		)
	}
}
