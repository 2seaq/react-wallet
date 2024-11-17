import * as React from 'react';
import InvoiceQRScanner from './InvoiceQRScanner';
import { WalletConsumer, WalletContext } from '../../../context/WalletContext';


export default class InputPayRequest extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			activeSubStep: "scan",
			draftpaybolt11: "",
			draftpayamount_msat: 0,
			decodedlnurl: { tag: "", callback: "", domain: "", minSendable: 0, maxSendable: 0, metadata: "", commentAllowed: 0 }
		};

	}

	findSubstringPosition = (mainString, searchString) => {
		const position = mainString.toLowerCase().indexOf(searchString.toLowerCase());
		return position;
	}

	extractBitcoinLightningAddress = (inputString) => {

		if (inputString.toLowerCase().includes("lnbc")) {
			const startIndex = inputString.toLowerCase().indexOf("lnbc");
			const bolt11 = inputString.slice(startIndex);
			return ["BOLT11", bolt11];
		}

		if (inputString.toLowerCase().includes("lntb")) {
			const startIndex = inputString.toLowerCase().indexOf("lntb");
			const bolt11 = inputString.slice(startIndex);
			return ["BOLT11", bolt11];
		}

		if (inputString.toLowerCase().includes("lnurl")) {
			const startIndex = inputString.toLowerCase().indexOf("lnurl");
			const lnurl = inputString.slice(startIndex);
			return ["LNURL", lnurl];
		}
		return null;
	}

	handleDecode = (data) => {

		if (!!data) {
			const lightningAddress = this.extractBitcoinLightningAddress(data);
			this.logMessage("INFO", "handleDecode " + data);

			if (lightningAddress != null) {
				if (lightningAddress[0] == "BOLT11") {
					this.logMessage("INFO", "Bolt11 Invoice Found " + lightningAddress[1]);
					this.props.setPayRequest(lightningAddress[1], "BOLT11");
				}
				if (lightningAddress[0] == "LNURL") {
					this.logMessage("INFO", "LNURL Address Found " + lightningAddress[1]);
					this.props.setPayRequest(lightningAddress[1], "LNURL");
				}
			}
		};
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleTextInput = (event) => {
		this.handleDecode(event.target.value);
	}

	handleNFCRead = (valueIn) => {
		this.handleDecode(valueIn);
	}

	handleError = (err) => {
		console.error(err)
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		return <InvoiceQRScanner
			handleDecode={this.handleDecode}
			handleTextInput={this.handleTextInput}
			handleNFCRead={this.handleNFCRead}
			handleCancel={this.handleCancel} />;
	}
}