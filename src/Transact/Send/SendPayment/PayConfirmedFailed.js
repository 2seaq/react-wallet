import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Icon } from '@mui/material';

export default class PayConfirmedFailed extends React.Component {

	constructor(props) {
		super(props);
		this.handleReset = this.handleReset.bind(this)
	}

	handleReset() {
		this.props.handleReset();
	}

	render() {

		return (
			<React.Fragment>
				<Box
					display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="75vh"	>
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '25%', bgcolor: '' }}>
						<Icon style={{ fontSize: 100, color: 'red' }}>
							<HighlightOffIcon style={{ fontSize: 100, color: 'red' }} />
						</Icon><br />
						<Typography variant="h6" gutterBottom color="success">Payment Failure </Typography>
					</Box>
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '15%', bgcolor: '' }}>
						<br /><Button onClick={this.handleReset} variant="contained" endIcon={<HighlightOffIcon />}>
							Close
						</Button>
					</Box>
				</Box>
			</React.Fragment>
		)
	}
}