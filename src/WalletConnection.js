import React, { Component } from 'react';
const client = require('./client');

// This class has dummy responses for testing purposes
// the client calls should be used in an implementation
// The API Calls need rejection handling to be implemented.

export default class WalletConnection extends Component {

	decodeBolt11(bolt11In) {
		return new Promise((resolve, reject) => {

			   client({method: 'GET', path: '/osys/wallet/decode?bolt11=' + bolt11In}).then(response => {
			    resolve(response); 
			 });
		});
	}

	getAccount = () => {
		return new Promise((resolve, reject) => {

				client({method: 'GET', path: '/osys/wallet/account'}).then(response => {
				  resolve(response); 
				});
		});
	}

	createInvoice = (inval) => {

		console.log("Wallet Connection - Creating Invoice");
		console.log("Creating Invoice " + inval.amountMsat);
		console.log("Creating Description " + inval.description);

		return new Promise((resolve, reject) => {

				client({method: 'POST', path: '/api/invoices', entity: inval, headers: {'Content-Type':'application/json'}}).then(response => {
				  resolve(response); 
				});
		});
	}

	sendPay = (inval) => {

		const newPay = {};
		const currentTimeInMillis = new Date().getTime();

		newPay["bolt11"] = inval.bolt11;
		newPay["amountMsat"] = inval.amount_msat;
		newPay["bolt11Description"] = inval.bolt11Description;
		newPay["bolt11Payee"] = inval.bolt11Payee;
		newPay["timestamp"] = currentTimeInMillis;

		return new Promise((resolve, reject) => {

				client({method: 'POST', path: '/api/pays', entity: newPay, headers: {'Content-Type':'application/json'}}).then(response => {
				  resolve(response); 
				});
		});
	}

	getInvoices = () => {
		return new Promise((resolve, reject) => {

				client({method: 'GET', path: '/api/invoices'}).then(response => {
				  resolve(response); 
				});
		});
	}

	getPays = () => {
		return new Promise((resolve, reject) => {

				client({method: 'GET', path: '/api/pays'}).then(response => {
				  resolve(response); 
				});
		});
	}

	getDeposits = () => {
		return new Promise((resolve, reject) => {

				client({method: 'GET', path: '/osys/wallet/funds'}).then(response => {
				  resolve(response); 
				});
		});
	}

	render() {
		return <div>Wallet Service Connetion Class</div>;
	}
}