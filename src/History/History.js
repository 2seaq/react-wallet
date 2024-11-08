import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { WalletConsumer } from '../context/WalletContext';
import SendIcon from '@mui/icons-material/Send';
import GetAppIcon from '@mui/icons-material/GetApp';
import LinkIcon from '@mui/icons-material/Link';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default class History extends React.Component {

	constructor(props) {
		super(props);
	}

	
	mergeAndSortEvents(deposits, invoices, payments) {
		// Combine deposits and invoices into a single array
		const allEvents = [
			...deposits.map(item => ({
				timestamp: item.timestamp,
				description: item.description,
				amountMsat: item.amountMsat,
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
			}))];

		// Sort the events if needed (e.g., by date if events have a 'date' property)
		// This is an example of sorting by a 'date' property (assuming it's in the data structure)
		allEvents.sort((a, b) => new Date(Number(b.timestamp)) - new Date(Number(a.timestamp)));

		return allEvents;
	}

	render() {
		return (
			<WalletConsumer>
				{({ deposits, invoices, payments }) => {
					// Merge and sort deposits and invoices
					const events = this.mergeAndSortEvents(deposits, invoices, payments);

					return (
						<div>
							{
								events.map((event, index) => (
									<div key={index}>
										<HistoryEvent event={event} />
									</div>
								))
							}
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

	renderIcon() {
		const { source } = this.props.event;
		switch (source) {
			case 'Deposit':
				return <LinkIcon />;
			case 'Invoice':
				return <GetAppIcon />;
			case 'Payment':
				return <SendIcon />;
			default:
				return <CurrencyBitcoinIcon />;
		}
	}

	formatCurrency(amountMsat) {
		const amount = amountMsat / 1000; // Assuming msat is thousandths of a currency unit
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'SAT' // Change 'USD' to desired currency code if needed
		}).format(amount);
	}

	formatTimestamp(timestamp) {
		// Convert timestamp to a number first
		const timestampNumber = Number(timestamp);
		
		// Check if it's a valid number
		if (isNaN(timestampNumber)) {
			return "Invalid Date";
		}
		
		// Convert the valid timestamp number to a Date object
		const date = new Date(timestampNumber*1000);

		// Return formatted date and time
		return new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium', // Adjust to 'short', 'medium', 'long', or 'full' as needed
			timeStyle: 'short'
		}).format(date);
	}

	render() {
		return (
			<ListItem alignItems="flex-start" >
				<ListItemAvatar>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						variant="dot">
						{this.renderIcon()}
					</Badge>
				</ListItemAvatar>
				<ListItemText
					primary={
						<React.Fragment>
							<Grid component="span" container spacing={2}>
								<Grid component="span" item xs={4} style={{ textAlign: 'left' }}>
								{this.props.event.source}								</Grid>
								<Grid component="span" item xs={8} style={{ textAlign: 'right' }}>
								{this.formatCurrency(this.props.event.amountMsat)}
								</Grid>
							</Grid>
						</React.Fragment>
					}
					secondary={
						<React.Fragment>
							<Grid component="span" container spacing={2}>
								<Grid component="span" item xs={6} style={{ textAlign: 'left' }}>
									{this.props.event.description}
								</Grid>
								<Grid component="span" item xs={6} style={{ textAlign: 'right' }}>
									{this.formatTimestamp(this.props.event.timestamp)}
								</Grid>
							</Grid>
						</React.Fragment>
					}
				/>
			</ListItem>
		)
	}
}