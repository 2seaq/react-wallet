import React, { createContext, Component } from 'react';

export const WalletContext = createContext();

export class WalletProvider extends Component {
    state = {
        address: "",
        availableBalance: 0,
        invoices: [],
        deposits: [],
        payments: [],
        logs: [],
        maxLogSize: 3
    };

    setInvoices = (invoicesIn) => {
        this.setState({ invoices: invoicesIn });
    };

    setDeposits = (depositsIn) => {
        this.setState({ deposits: depositsIn });
    };

    setPayments = (paymentsIn) => {
        this.setState({ payments: paymentsIn });
    };

    setAddress = (addressIn) => {
        this.setState({ address: addressIn });
    }

    // all balances and amounts are mSats but displayed in Sats. Need to change var to make more clear
    setAvailableBalance = (availableBalanceIn) => {
        this.setState({ availableBalance: availableBalanceIn });
    }

    isPaid = (bolt11In) => {
        for (var i = 0; i < this.state.invoices.length; i++) {
            if (this.state.invoices[i].bolt11 == bolt11In
                && (this.state.invoices[i].status == "paid"
                    || this.state.invoices[i].status == "internalpaid")) {
                return true;
            }
        }
        return false;
    }

    allTransactions = () => {
        const merged = [this.state.invoices, this.state.deposits, this.state.payments].flat();
        return merged.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    };

    log = (eventTypeIn, eventIn) => {

        const now = new Date();

        // Extract hours, minutes, and seconds
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const mseconds = now.getMilliseconds();

        // Format the time as HH:MM:SS
        const formattedTime = `${hours.toString().padStart(2, '0')}:
        ${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}`;

        const timestamp = new Date().toISOString();
        this.setState(prevState => {
            const updatedItems = [...prevState.logs, `${formattedTime} : ${eventTypeIn} : ${eventIn}`];
            // Remove the oldest event if the array exceeds the max size
            if (updatedItems.length > this.state.maxLogSize) {
                updatedItems.shift();
            }
            return { logs: updatedItems };
        });
    };

    render() {
        return (
            <WalletContext.Provider
                value={{
                    logs: this.state.logs,
                    log: this.log,
                    address: this.state.address,
                    setAddress: this.setAddress,
                    availableBalance: this.state.availableBalance,
                    setAvailableBalance: this.setAvailableBalance,
                    deposits: this.state.deposits,
                    setDeposits: this.setDeposits,
                    invoices: this.state.invoices,
                    setInvoices: this.setInvoices,
                    payments: this.state.payments,
                    setPayments: this.setPayments,
                }}
            >
                {this.props.children}
            </WalletContext.Provider>
        );
    }
}

export const WalletConsumer = WalletContext.Consumer;
