import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Icon } from '@mui/material';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import CircularProgress from '@mui/material/CircularProgress';

export default class PayConfirmedWaiting extends React.Component {

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
							<CircularProgress  size="80px"  />
<br />
						<Typography variant="h6" gutterBottom color="success">Sending Payment...</Typography>
					</Box>
					<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '15%', bgcolor: '' }}>
						<br /><Button onClick={this.handleReset} variant="outlined" endIcon={<HighlightOffIcon />}>
							Close
						</Button>
					</Box>
				</Box>
			</React.Fragment>
		)
	}
}