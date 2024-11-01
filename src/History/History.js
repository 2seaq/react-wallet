import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { WalletConsumer } from '../context/WalletContext';
import SendIcon from '@mui/icons-material/Send';

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
				source: 'deposits'
			})),
			...payments.map(item => ({
				timestamp: item.timestamp,
				description: item.description,
				amountMsat: item.amountMsat,
				status: item.status,
				source: 'payments'
			})),
			...invoices.map(item => ({
				timestamp: item.timestamp,
				description: item.description,
				amountMsat: item.amountMsat,
				status: item.status,
				source: 'invoices'
			}))];

		// Sort the events if needed (e.g., by date if events have a 'date' property)
		// This is an example of sorting by a 'date' property (assuming it's in the data structure)
		allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

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

	render() {
		return (
			<ListItem alignItems="flex-start" >
				<ListItemAvatar>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						variant="dot">
						<SendIcon />
					</Badge>
				</ListItemAvatar>
				<ListItemText
					primary={
						<React.Fragment>
							<Grid component="span" container spacing={2}>
								<Grid component="span" item xs={8} style={{ textAlign: 'left' }}>
									Deposit
								</Grid>
								<Grid component="span" item xs={4} style={{ textAlign: 'right' }}>
									{this.props.event.amountMsat}
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
								</Grid>
							</Grid>
						</React.Fragment>
					}
				/>
			</ListItem>
		)
	}
}