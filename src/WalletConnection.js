import React, { Component } from 'react';
const client = require('./client');

// This class has dummy responses for testing purposes
// the client calls should be used in an implementation

export default class WalletConnection extends Component {

	decodeBolt11(bolt11In) {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					amount_msat: "121212",
					description: "Long Black Coffee",
					payee: "Payee Details from Decode"
				}
			};

			resolve(data);

			//   client({method: 'GET', path: '/osys/wallet/decode?bolt11=' + bolt11In}).then(response => {
			//    resolve(response); 
			// });
		});
	}

	getAccount = () => {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwfmu9g",
					availableBalance: "5000000"
				}
			};

			resolve(data);

			//	client({method: 'GET', path: '/osys/wallet/account'}).then(response => {
			//	  resolve(response); 
			//	});
		});
	}

	createInvoice = (inval) => {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					bolt11: "lnbc10u1ps7g39qpp5vrl9k6zg3fwmcxl7nhv2jvnldvflm9j2tfh7h4qz9fr5hywdpxfsdq8w3jhxapqdpsxqcqp2rzjqw9dj2em26yl60z6c3jt2h3qkf8u47sq2v5rwcrxlzvwyhlh3flw6gfhe7erdrkvsyg8sp76gyynap5k3tkqjphz0rp2qyglddd",
					amountMsat: inval.amountMsat,
					description: inval.description,
					status: "unpaid",
					payment_hash: "Payhash87687324kkjf"

				}
			};

			resolve(data);

			//	client({method: 'POST', path: '/api/invoices', entity: inval, headers: {'Content-Type':'application/json'}}).then(response => {
			//	  resolve(response); 
			//	});
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

			const data = {
				entity: {
					bolt11: "lnbc10u1ps7g39qpp5vrl9k6zg3fwmcxl7nhv2jvnldvflm9j2tfh7h4qz9fr5hywdpxfsdq8w3jhxapqdpsxqcqp2rzjqw9dj2em26yl60z6c3jt2h3qkf8u47sq2v5rwcrxlzvwyhlh3flw6gfhe7erdrkvsyg8sp76gyynap5k3tkqjphz0rp2qyglddd",
					amountMsat: "23434",
					bolt11description: "Long Black Coffee Response",
					status: "success",
					bolt11Payee: "bolt11Payeedsdfsdf"

				}
			};
			resolve(data);

			//	client({method: 'POST', path: '/api/pays', entity: newPay, headers: {'Content-Type':'application/json'}}).then(response => {
			//	  resolve(response); 
			//	});
		});
	}

	getInvoices = () => {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					_embedded: {
						invoices: [
							{ bolt11: "bolt11INVadd1", timestamp: "1123213110", description: "Invoice Description 1 - Coffee", amountMsat: "323432434", status: 'paid' },
							{ bolt11: "bolt11INVadd2ddd", timestamp: "1123213120", description: "Invoice 2 - Hair Cut", amountMsat: "3234324", status: 'unpaid' },
							{ bolt11: "lnbc10u1ps7g39qpp5vrl9k6zg3fwmcxl7nhv2jvnldvflm9j2tfh7h4qz9fr5hywdpxfsdq8w3jhxapqdpsxqcqp2rzjqw9dj2em26yl60z6c3jt2h3qkf8u47sq2v5rwcrxlzvwyhlh3flw6gfhe7erdrkvsyg8sp76gyynap5k3tkqjphz0rp2qyglddd", timestamp: "1123213130", description: "Invoice Description 3 - Sample", amountMsat: "3234324", status: 'unpaid' }
						]
					},
				}
			};

			resolve(data);

			//	client({method: 'GET', path: '/api/invoices'}).then(response => {
			//	  resolve(response); 
			//	});
		});
	}

	getPays = () => {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					_embedded: {
						pays: [
							{ bolt11: "bolt11PAYadd1", timestamp: "1123213210", description: "Pays 1 - Payment for rent", amountMsat: "323432434", status: 'paid' },
							{ bolt11: "bolt11PAYadd1", timestamp: "1123213220", description: "Pays 2 - Subscription", amountMsat: "323432434", status: 'paid' },
							{ bolt11: "bolt11PAYadd1", timestamp: "1123213230", description: "Pays 3 - Internet", amountMsat: "323432434", status: 'paid' }
						]
					},
				}
			};

			resolve(data);
			//	client({method: 'GET', path: '/api/pays'}).then(response => {
			//	  resolve(response); 
			//	});
		});
	}

	getDeposits = () => {
		return new Promise((resolve, reject) => {

			const data = {
				entity: {
					_embedded: {
						deposits: [
							{ timestamp: "1123213310", description: "Deposit for Funding A", amountMsat: "323432434", status: 'paid' },
							{ timestamp: "1123213320", description: "Deposit for Funding B", amountMsat: "323432434", status: 'paid' },
							{ timestamp: "1123213330", description: "Dep CSH B", amountMsat: "323432434", status: 'unpaid' }
						]
					},
				}
			};

			resolve(data);
			//	client({method: 'GET', path: '/osys/wallet/funds'}).then(response => {
			//	  resolve(response); 
			//	});
		});
	}

	render() {
		return <div>Wallet Service Connetion Class</div>;
	}
}