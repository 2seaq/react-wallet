import * as React from 'react';
import InvoicePaid from './InvoicePaid';
import InvoiceExpired from './InvoiceExpired';
import InvoiceWaiting from './InvoiceWaiting';
import { WalletConsumer, WalletContext } from '../../../context/WalletContext';

export default class GeneratedInvoice extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);

		this.state = {
			invoicestatus: "unpaid",
			currentBolt11: ""
		};
	}

	componentDidMount() {
		this.setState({
			invoicestatus: "unpaid"
		});
	}

	componentWillUnmount() {
		this.setState({
			invoicestatus: "unpaid"
		});
	}

	handleReset = () => {
		this.setState({
			invoicestatus: "unpaid"
		});
		this.props.handleReset();
	}

	handlePaid = () => {
		this.setState({
			invoicestatus: "paid"
		});
	}

	handleExpired = () => {
		this.setState({
			invoicestatus: "expired"
		});
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageIn);
	};

	render() {

		return (
			<WalletConsumer>
				{({ invoices }) => {

					console.log(invoices);

					var foundInvoice = invoices.find(
						invoice => invoice.bolt11 === this.props.createdInvoiceRepsonse.bolt11);

					console.log("found invoice " + foundInvoice);

					var invoicestatus = 'unpaid';
					if (foundInvoice && foundInvoice.status === 'paid') {
						invoicestatus = 'paid';
					}

					console.log("found invoice STATUS " + invoicestatus);

					switch (invoicestatus) {
						case 'paid':
							return <InvoicePaid handleReset={this.handleReset} />
						case 'expired':
							return <InvoiceExpired handleReset={this.handleReset} />
						default:
							return <InvoiceWaiting handleReset={this.handleReset}
								handleExpired={this.handleExpired}
								createdInvoiceRepsonse={this.props.createdInvoiceRepsonse} />;
					}

				}}
			</WalletConsumer>

		)
	}
}