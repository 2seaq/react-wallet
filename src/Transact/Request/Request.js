import * as React from 'react';
import Box from '@mui/material/Box';
//import GeneratedInvoice from './Invoice/GeneratedInvoice';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import WalletConnection from '../../WalletConnection';
import { WalletConsumer, WalletContext } from '../../context/WalletContext';

import Received from './Invoice/Received';
import Expired from './Invoice/Expired';
import Waiting from './Invoice/Waiting';


const walletConnection = new WalletConnection();

export default class Request extends React.Component {

	static contextType = WalletContext;


	constructor(props) {
		super(props);
		this.state = {
			invoicestatus: "unpaid",
		};
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleExpired = () => {
		this.setState({
			invoicestatus: "expired"
		});
	}

	handleReset = () => {
		//		this.logMessage("Info", "InvoiceWorkflow - handleReset Called ");
		this.setState({
			invoicestatus: "unpaid",
		});
		this.props.handleReset();
		this.props.handleRequestDialogClose();
	};

	render() {

		const { activeStep } = this.state;
		const steps = ['Set Amount', 'Generate Invoice', 'Payment'];

		return (
			<WalletConsumer>
				{({ invoices }) => {

					console.log(invoices);

					var foundInvoice = invoices.find(
						invoice => invoice.bolt11 === this.props.createdInvoiceRepsonse.bolt11);

					console.log("found invoice " + foundInvoice);

					var invoicestatus = this.state.invoicestatus;
					if (foundInvoice && foundInvoice.status === 'paid') {
						invoicestatus = 'paid';
					}

					console.log("found invoice STATUS " + invoicestatus);

					switch (invoicestatus) {
						case 'paid':
							return <Received
								createdInvoiceRepsonse={this.props.createdInvoiceRepsonse}
								handleReset={this.handleReset} />
						case 'expired':
							return <Expired
								createdInvoiceRepsonse={this.props.createdInvoiceRepsonse}
								handleReset={this.handleReset} />
						default:
							return <Waiting
								handleRequestDialogClose={this.props.handleRequestDialogClose}
								handleReset={this.handleReset}
								handleExpired={this.handleExpired}
								createdInvoiceRepsonse={this.props.createdInvoiceRepsonse} />;
					}
				}}
			</WalletConsumer>
		)
	}
}