import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import Alert from '@mui/material/Alert';

import Activity from './Activity/Activity';
import Settings from './Settings/Settings';
import Transact from './Transact/Transact';

import WalletConnection from './WalletConnection';
import SocketConnection from './SocketConnection';
import { WalletContext } from './context/WalletContext';
import { SOCKET_URL } from './conf';

const walletConnection = new WalletConnection();
const socketConnection = new SocketConnection(SOCKET_URL);

export default class App extends React.Component {
	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			loggedInManager: this.props.loggedInManager,
		};
	}

	componentDidMount() {
		this.logMessage("INFO", "App Component Mounted");
		this.logMessage("INFO", "Socket Active " + socketConnection.getStatus());

		this.loadWalletData();

		socketConnection.isEndPointActive()
			.then(isActive => {
				if (!isActive) throw new Error('WebSocket endpoint is not active');
				this.logMessage("INFO", "Registering WebSocket listeners...");
				return socketConnection.register([
					{ route: '/user/queue/newInvoiceCreated', callback: this.handleNewInvoice },
					{ route: '/user/queue/invoicePaid', callback: this.handleInvoicePaid },
					{ route: '/user/queue/newPayCreated', callback: this.handleNewPay },
				]);
			})
			.then(() => {
				this.logMessage("INFO", "WebSocket connected and listeners registered");
				this.interval = setInterval(this.loadWalletData, 4000);
			})
			.catch(error => {
				this.logMessage("ERR", `WebSocket connection failed: ${error.message}`);
			});
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.logMessage("INFO", "App Component Unmounted");
		this.logMessage("INFO", "Unregistering WebSocket listeners and closing connection");
		if (typeof socketConnection.unregister === 'function') {
			socketConnection.unregister();
		}
		if (typeof socketConnection.disconnect === 'function') {
			socketConnection.disconnect(); // optional method, if implemented
		}
	}

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	handleNavigationChange = (tabIndex) => {
		this.setState({ selectedTab: tabIndex });
	};

	loadWalletData = () => {
		this.logMessage("INFO", "Loading wallet data from server...");
		this.fetchInvoices();
		this.fetchPayments();
		this.fetchDeposits();
		this.fetchAccount();
	};

	fetchInvoices = () => {
		const { setInvoices } = this.context;
		walletConnection.getInvoices()
			.then(res => setInvoices(res.entity._embedded.invoices))
			.catch(err => this.logMessage("ERR", `Failed to fetch invoices: ${err.message}`));
	};

	fetchPayments = () => {
		const { setPayments } = this.context;
		walletConnection.getPays()
			.then(res => setPayments(res.entity._embedded.pays))
			.catch(err => this.logMessage("ERR", `Failed to fetch payments: ${err.message}`));
	};

	fetchDeposits = () => {
		const { setDeposits } = this.context;
		walletConnection.getDeposits()
			.then(res => setDeposits(res.entity.outputs))
			.catch(err => this.logMessage("ERR", `Failed to fetch deposits: ${err.message}`));
	};

	fetchAccount = () => {
		const { setAddress, setAvailableBalance } = this.context;
		walletConnection.getAccount()
			.then(res => {
				setAddress(res.entity.address);
				setAvailableBalance(res.entity.availableBalance);
			})
			.catch(err => this.logMessage("ERR", `Failed to fetch account: ${err.message}`));
	};

	handleNewInvoice = () => {
		this.logMessage("INFO", "New Invoice Created");
		this.fetchInvoices();
		this.fetchAccount();
	};

	handleInvoicePaid = () => {
		this.logMessage("INFO", "Invoice Paid");
		this.fetchInvoices();
		this.fetchAccount();
	};

	handleNewPay = () => {
		this.logMessage("INFO", "New Pay Created");
		this.fetchPayments();
		this.fetchAccount();
	};

	renderActiveTab() {
		switch (this.state.selectedTab) {
			case 0: return <Transact />;
			case 1: return <Activity />;
			case 2: return <Settings />;
			default: return null;
		}
	}

	render() {
		return (
			<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ flexShrink: 0, pt: 5 }}>
					<Alert severity="info" sx={{ alignItems: 'center' }}>
						Testnet 4
					</Alert>
				</Box>

				<Box sx={{ flexGrow: 1, overflow: 'auto', pb: '30px' }}>
					{this.renderActiveTab()}
				</Box>

				<Box sx={{ flexShrink: 0 }}>
					<WalletBottomNav
						value={this.state.selectedTab}
						onChange={this.handleNavigationChange}
					/>
				</Box>
			</Box>
		);
	}
}

class WalletBottomNav extends React.Component {
	handleChange = (event, newValue) => {
		this.props.onChange(newValue);
	};

	render() {
		return (
			<BottomNavigation
				showLabels
				value={this.props.value}
				onChange={this.handleChange}
			>
				<BottomNavigationAction label="Transact" icon={<ImportExportIcon />} />
				<BottomNavigationAction label="Activity" icon={<FormatListBulletedIcon />} />
				<BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
			</BottomNavigation>
		);
	}
}
