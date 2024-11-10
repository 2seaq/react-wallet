import * as React from 'react';
import Summary from './Summary/Summary';
import Send from './Send/Send';
import Receive from './Receive/Receive';
import { WalletContext } from '../context/WalletContext';
import Box from '@mui/material/Box';


export default class Transact extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = { val: 0 };
	}

	handleClick = (inval) => {
		this.logMessage("Info", "Navigate " + inval);
		this.setState({
			val: inval
		});
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	render() {

		const components = [
			<Summary
				onNavigate={this.handleClick} />,
			<Send
				onNavigate={this.handleClick} />,
			<Receive
				onNavigate={this.handleClick} />];

		return (
			<Box>
				{components[this.state.val]}
			</Box>
		)
	}
}