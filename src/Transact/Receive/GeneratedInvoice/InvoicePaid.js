import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Icon } from '@mui/material';

export default class InvoicePaid extends React.Component  {

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
					<CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />	
					</Icon><br/>
					<Typography variant="h6" gutterBottom color="success">Payment Received</Typography>
					</Box>		
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '15%', bgcolor: ''}}>
					<Button onClick={this.handleReset} variant="outlined" endIcon={<HighlightOffIcon />}>
							Close
						</Button>
					</Box>
					</React.Fragment> 		 									
			</Box>
		)
	}
}