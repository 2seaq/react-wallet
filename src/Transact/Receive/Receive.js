import * as React from 'react';
import Box from '@mui/material/Box';
import ChooseInvoiceDetails from './ChooseInvoiceDetails/ChooseInvoiceDetails';
import GeneratedInvoice from './GeneratedInvoice/GeneratedInvoice';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import WalletConnection from '../../WalletConnection';
import { WalletContext } from '../../context/WalletContext';

const walletConnection = new WalletConnection();

export default class Receive extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			createdInvoiceRepsonse: { bolt11: "", amountMsat: "", description: "", status: "", payment_hash: "", expires_at: "" },
			activeStep: 0
		};
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleNext = () => {
//		this.logMessage("Info", "handleNext Called ");
		this.setState({
			activeStep: this.state.activeStep + 1
		});
	};

	handleReset = () => {
//		this.logMessage("Info", "InvoiceWorkflow - handleReset Called ");
		this.setState({
			activeStep: 0
		});
		this.props.onNavigate(0);
	};

	createInvoice = (inval) => {
		this.logMessage("Info", "Create Invoice" + inval);

		walletConnection.createInvoice(inval).then(response => {
			this.setState({
				createdInvoiceRepsonse: {
					bolt11: response.entity.bolt11,
					amountMsat: response.entity.amountMsat,
					description: response.entity.description,
					status: response.entity.description,
					payment_hash: response.entity.payment_hash
				},
			});
		});
	}

	resetCreateInvoiceResponse = () => {
		console.log("App - resetCreateInvoiceResponse");
		this.setState({
			createdInvoiceRepsonse: { bolt11: "", amountMsat: "", description: "", status: "", payment_hash: "", expires_at: "" },
		});
	}

	render() {


		const { activeStep } = this.state;
		const steps = ['Set Amount', 'Generate Invoice', 'Payment'];
		const components = [
			<ChooseInvoiceDetails
				createInvoice={this.createInvoice}
				handleReset={this.handleReset}
				handleNext={this.handleNext} />,
			<GeneratedInvoice
				createdInvoiceRepsonse={this.state.createdInvoiceRepsonse}
				resetCreateInvoiceResponse={this.props.resetCreateInvoiceResponse}
				handleReset={this.handleReset} />];

		return (
			<div>
				<Box sx={{ width: '100%', p: 3 }}>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps = {};
							const labelProps = {};
							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				</Box>
				{components[this.state.activeStep]}
			</div>
		)
	}
}
