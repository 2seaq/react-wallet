import * as React from 'react';
import PayConfirmedSuccess from './PayConfirmedSuccess';
import PayConfirmedFailed from './PayConfirmedFailed';
import PayConfirmedWaiting from './PayConfirmedWaiting';
import WalletConnection from '../../../WalletConnection';
import { WalletContext } from '../../../context/WalletContext';

const walletConnection = new WalletConnection();

export default class SendPayment extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			sentPayRepsonse: { bolt11: "", amountMsat: "", timestamp: "", bolt11description: "", status: "", bolt11Payee: "" },
		};
	}

	componentDidMount() {
		walletConnection.sendPay(this.props.payment).then(response => {

			this.setState({
				sentPayRepsonse: {
					bolt11: response.entity.bolt11,
					amountMsat: response.entity.amountMsat,
					bolt11description: response.entity.bolt11description,
					status: response.entity.status,
					bolt11Payee: response.entity.bolt11Payee
				},
			});

			this.logMessage("INFO", "response Bolt11 " + response.entity.bolt11);
			this.logMessage("INFO", "response Amount " + response.entity.amountMsat);
			this.logMessage("INFO", "response bolt11Payee " + response.entity.bolt11description);
			this.logMessage("INFO", "response status  " + response.entity.status);
		})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleReset = () => {
		this.props.handleReset();
	}

	render() {

		switch (this.state.sentPayRepsonse.status) {
			case 'success':
				return <PayConfirmedSuccess handleReset={this.handleReset} />
			case 'internalsuccess':
				return <PayConfirmedSuccess handleReset={this.handleReset} />
			case 'failure':
				return <PayConfirmedFailed handleReset={this.handleReset} />
			default:
				return <PayConfirmedWaiting handleReset={this.handleReset} />;
		}
	}
}