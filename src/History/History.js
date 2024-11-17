import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { WalletConsumer } from '../context/WalletContext';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export default class History extends React.Component {
	constructor(props) {
		super(props);
	}

	mergeAndSortEvents(deposits, invoices, payments) {
		const allEvents = [
			...deposits.map(item => ({
				timestamp: item.blockheight,
				description: item.txid.substring(0, 10),
				amountMsat: item.amount_msat,
				status: item.status,
				source: 'Deposit'
			})),
			...payments.map(item => ({
				timestamp: item.timestamp,
				description: item.description,
				amountMsat: item.amountMsat,
				status: item.status,
				source: 'Payment'
			})),
			...invoices.map(item => ({
				timestamp: item.timestamp,
				description: item.description,
				amountMsat: item.amountMsat,
				status: item.status,
				source: 'Invoice'
			}))
		];

		allEvents.sort((a, b) => new Date(Number(b.timestamp)) - new Date(Number(a.timestamp)));
		return allEvents;
	}

	render() {
		return (
			<WalletConsumer>
				{({ deposits, invoices, payments }) => {
					const events = this.mergeAndSortEvents(deposits, invoices, payments);
					return (
						<div>
							{events.map((event, index) => (
								<div key={index}>
									<HistoryEvent event={event} /><Divider />
								</div>
							))}
						</div>
					);
				}}
			</WalletConsumer>
		)
	}
}

class HistoryEvent extends React.Component {
	constructor(props) {
		super(props);
	}

	// Helper function to determine badge color based on status
	getBadgeColor(status) {
		switch (status.toLowerCase()) {
			case 'paid':
			case 'success':
				return 'green';
			case 'pending':
				return 'orange';
			default:
				return 'blue';
		}
	}

	renderIcon() {
		const { source } = this.props.event;
		switch (source) {
			case 'Deposit':
				return <SaveAltIcon />;
			case 'Invoice':
				return <SouthWestIcon />;
			case 'Payment':
				return <NorthEastIcon />;
			default:
				return <CurrencyBitcoinIcon />;
		}
	}

	formatTimestamp(timestamp) {
		const timestampNumber = Number(timestamp);
		if (isNaN(timestampNumber)) {
			return "Invalid Date";
		}
		const date = new Date(timestampNumber * 1000);
		return new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(date);
	}

	render() {
		const { status } = this.props.event;
		const badgeColor = this.getBadgeColor(status);

		return (
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						variant="dot"
						sx={{
							'& .MuiBadge-dot': {
								backgroundColor: badgeColor,
							}
						}}
					>
						{this.renderIcon()}
					</Badge>
				</ListItemAvatar>
				<ListItemText
					primary={
						<React.Fragment>
							<Grid component="span" container spacing={2}>
								<Grid component="span" item xs={4} style={{ textAlign: 'left' }}>
									{this.props.event.source}
								</Grid>
								<Grid component="span" item xs={8} style={{ textAlign: 'right' }}>
									{Number(Math.round(this.props.event.amountMsat / 1000)).toLocaleString()} sats
								</Grid>
							</Grid>
						</React.Fragment>
					}
					secondary={
						<React.Fragment>
							<Grid component="span" container spacing={2}>
								<Grid component="span" item xs={6} style={{ textAlign: 'left', fontSize: '0.7rem' }}>
										{this.props.event.description} {this.props.event.status}
								</Grid>
								<Grid component="span" item xs={6} style={{ textAlign: 'right', fontSize: '0.7rem' }}>
										{this.formatTimestamp(this.props.event.timestamp)}
								</Grid>
							</Grid>
						</React.Fragment>
					}
				/>
			</ListItem>
		);
	}
}
