import * as React from 'react';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GetAppIcon from '@mui/icons-material/GetApp';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WalletConsumer } from '../../context/WalletContext';

export default class Summary extends React.Component {

	constructor(props) {
		super(props);
	}

	handleClick = (inval) => {
		this.props.onNavigate(inval);
	}

	render() {
		return (
			<WalletConsumer>
				{({ availableBalance }) => {
					return (
							<Box
								display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="75vh"	>
								<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '40%'}}>
									<Typography variant="h5" gutterBottom>Balance:</Typography>
									<Typography variant="h3" gutterBottom>{Number(availableBalance/1000).toLocaleString()} sats</Typography>
								</Box>
								<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '20%' }}>
									<ButtonGroup variant="outlined" aria-label="outlined primary button group">
										<Button onClick={() => this.handleClick(2)} startIcon={<GetAppIcon />}>Receive</Button>
										<Button onClick={() => this.handleClick(1)} endIcon={<SendIcon />}>Send</Button>
									</ButtonGroup>
								</Box>
							</Box>
					);
				}}
			</WalletConsumer>
		)
	}
}