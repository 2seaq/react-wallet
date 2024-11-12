import * as React from 'react';
import Box from '@mui/material/Box';
import ConfirmPaymentDetails from './ConfirmPaymentDetails/ConfirmPaymentDetails';
import SendPayment from './SendPayment/SendPayment';
import InputPayRequest from './InputPayRequest/InputPayRequest';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { WalletContext } from '../../context/WalletContext';

export default class Send extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
			paymentRequest: { code: "", type: "" },
			payment: { bolt11: "", 
				amount_msat: "", 
				bolt11Description: "", 
				bolt11Payee: "", 
				status: "unset" }
		};
	};

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	setPayRequest = (payRequestCodeIn, payRequestTypeIn) => {
		this.logMessage("INFO", "Pay Req " + payRequestTypeIn + " : " + payRequestCodeIn);
		this.setState({
			activeStep: 1,
			paymentRequest: {
				code: payRequestCodeIn,
				type: payRequestTypeIn
			}
		});
	};

	setPayment = (paymentIn) => {
		this.logMessage("INFO", "Draft Pay " + paymentIn.bolt11 + " : " + paymentIn.amount_msat);
		this.setState({
			activeStep: 2,
			payment: {
				bolt11: paymentIn.bolt11,
				amount_msat: paymentIn.amount_msat,
				bolt11Description: paymentIn.bolt11Description,
				bolt11Payee: paymentIn.bolt11Payee,
				status: "draft"
			}
		});
	}

	handleReset = () => {
		this.logMessage("INFO", "Reset Pays");

		this.setState({
			activeStep: 0,
			paymentRequest: { code: "", type: "" },
			payment: { invoice: "", amount_sats: "", status: "unset" }
		});
		this.props.onNavigate(0);
	};

	render() {

		const { activeStep } = this.state;
		const steps = ['Scan', 'Confirm', 'Send'];

		const components = [
			<InputPayRequest
				handleCancel={this.handleReset}
				setPayRequest={this.setPayRequest} />,
			<ConfirmPaymentDetails
				paymentRequest={this.state.paymentRequest}
				handleReset={this.handleReset}
				setPayment={this.setPayment} />,
			<SendPayment
				payment={this.state.payment}
				handleReset={this.handleReset} />];

		return (
			<div>
				<Box sx={{ width: '100%', p: 0 }}>
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
				<div style={{ height: "75vh", paddingTop: '0px' }}>
					{components[this.state.activeStep]}
				</div>
			</div>
		)
	}
}