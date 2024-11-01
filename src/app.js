import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import History from './History/History';
import Settings from './Settings/Settings';
import Transact from './Transact/Transact';
import WalletConnection from './WalletConnection';
import SocketConnection from './SocketConnection';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, deepOrange, grey } from '@mui/material/colors';
import LoggerDisplay from './LoggerDisplay';
import { WalletContext } from './context/WalletContext';

const walletConnection = new WalletConnection();
const socketConnection = new SocketConnection("https://localhost:3000/websocket");
const stompClient = require('./websocket-listener');

export default class App extends React.Component {

	static contextType = WalletContext;

	constructor(props) {
		super(props);
		this.state = {
			val: 0,
			loggedInManager: this.props.loggedInManager,
			prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
		};
	}

	componentDidMount() {

		this.logMessage("INFO", "App Component Mounted");
		this.logMessage("INFO", socketConnection.getStatus());

		this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
		this.mediaQueryListener = (event) => {
			this.setState({ prefersDarkMode: event.matches });
		};
		this.mediaQueryList.addEventListener('change', this.mediaQueryListener);

		this.loadFromServer();

		this.logMessage("INFO", "Register Socket Listeners");
		socketConnection.isEndPointActive()
			.then(response => {
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			})
			.then(result => {
				socketConnection.register([
					{ route: '/user/queue/newInvoiceCreated', callback: this.newInvoiceCreated },
					{ route: '/user/queue/invoicePaid', callback: this.invoicePaid },
					{ route: '/user/queue/newPayCreated', callback: this.newPayCreated },
				]);
				this.logMessage("INFO", "Socket Registration ok")
			})
			.catch(error => [
				this.logMessage("INFO", "Socket Endpoint Not Active")
			]);

		this.interval = setInterval(this.scheduledCall, 4000);
	}

	componentWillUnmount() {
		this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
		// Clear the interval when the component is unmounted
		clearInterval(this.interval);
	}

	createTheme = () => {
		return createTheme({
			palette: {
				mode: this.state.prefersDarkMode ? 'dark' : 'light',
			},
		});
	};

	handleClick = (inval) => {
		this.logMessage("INFO", "Navigate Tab : " + inval);
		this.setState({
			val: inval
		});
	}

	loadFromServer() {
		this.logMessage("INFO", "Load From Server");
		this.getInvoicesAll();
		this.getPaysAll();
		this.getDepositsAll();
		this.getAccount();
	}

	// Set Account state - Invoices Pays Deposits Account
	getInvoicesAll = () => {
		const { setInvoices } = this.context;
	//	this.logMessage("INFO", "getInvoicesAll");
		walletConnection.getInvoices().then(response => {
			setInvoices(response.entity._embedded.invoices);
			console.log("From GetIngoicesAll");
		});
	}

	getPaysAll = () => {
		const { setPayments } = this.context;
	//	this.logMessage("INFO", "getPaysAll");
		walletConnection.getPays().then(response => {
			setPayments(response.entity._embedded.pays);
		});
	}

	getDepositsAll = () => {
		const { setDeposits } = this.context;
	//	this.logMessage("INFO", "getDepositsAll");
		walletConnection.getDeposits().then(response => {
			setDeposits(response.entity._embedded.deposits);
		});
	}

	getAccount = () => {
//		this.logMessage("INFO", "getAccount " + this.context.availableBalance);
		const { setAddress } = this.context;
		const { setAvailableBalance } = this.context;
		walletConnection.getAccount().then(response => {
			setAddress(response.entity.address);
			setAvailableBalance(response.entity.availableBalance);
		});
	}

	// WebSocket Handling 
	newInvoiceCreated = (message) => {
		this.logMessage("INFO", "newInvoiceCreated");
		this.getInvoicesAll();
		this.getAccount();
	}

	newPayCreated = (message) => {
		this.logMessage("INFO", "newPayCreated");
		this.getPaysAll();
		this.getAccount();
	}

	invoicePaid = (message) => {
		this.logMessage("INFO", "invoicePaid");
		this.getInvoicesAll();
		this.getAccount();
	}

	// Scheduled Calls 
	scheduledCall = () => {
//		this.logMessage("INFO", "scheduled Call");
		this.getDepositsAll();
		this.getInvoicesAll();
		this.getAccount();
	};

	logMessage = (messageTypeIn, messageIn) => {
		const { log } = this.context;
		log(messageTypeIn, messageIn);
	};

	getDesignTokens = (mode) => {
		return {
			palette: {
				mode,
				...(mode === 'light'
					? {
						// palette values for light mode
						primary: amber,
						divider: amber[200],
						text: {
							primary: grey[900],
							secondary: grey[800],
						},
					}
					: {
						primary: deepOrange,
						background: {
						},
						text: {
							primary: '#2a231e',
							secondary: '#2a231e',
						},
					}),
			},
			typography: {
				fontFamily: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				].join(','),
			},
		};
	};

	render() {

		const components = [
			<Transact />,
			<History />,
			<Settings />];

		const { mode } = this.props;
		const designTokens = this.getDesignTokens(mode);
		const theme = createTheme(designTokens);

		return (

			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box sx={{ pb: 0 }}>
					<Box sx={{ width: 1 }}>
						{components[this.state.val]}
					</Box>
					<Box sx={{ position: 'fixed', bottom: 70, left: 20, right: 0, width: 1 }} >
						<LoggerDisplay />
					</Box>
					<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
						<WalletBottomNav onNavigate={this.handleClick} />
					</Paper>
				</Box>
			</ThemeProvider>

		)
	}
}

class WalletBottomNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = { val1: 1 };
	}

	handleChange = (event, value) => {
		this.props.onNavigate(value);
	};

	render() {
		return (
			<Box sx={{ width: 1 }}>
				<BottomNavigation showLabels onChange={this.handleChange}>
					<BottomNavigationAction label="Transact" icon={<ImportExportIcon />} />
					<BottomNavigationAction label="Activity" icon={<FormatListBulletedIcon />} />
					<BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
				</BottomNavigation>
			</Box>
		)
	}
}
