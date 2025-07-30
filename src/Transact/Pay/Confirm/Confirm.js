import * as React from 'react';

import Bolt11Request from './Bolt11Request';
import LNURLRequest from './LNURLRequest';

export default class Confirm extends React.Component  {

    constructor(props) {
		super(props);
		console.log("App - Transact - Debit - ConfirmInvoiceToPay - constructor Called ");
	}

	handleReset = () => {
		this.props.handleReset();
    }

	render() {

		switch(this.props.paymentRequest.type) {
		    case 'BOLT11':
				return <Bolt11Request 
				handleStepBack={this.props.handleStepBack}
				handlePayDialogClose={this.props.handlePayDialogClose}
				paymentRequest={this.props.paymentRequest}
				setPayment={this.props.setPayment}				
				handleReset={this.handleReset}/>			
			case 'LNURL':
				return <LNURLRequest 
				paymentRequest={this.props.paymentRequest}
				setPayment={this.props.setPayment}									
				handleReset={this.handleReset}/>
			default:
				return <div/>;
		  }
	}
}