// src/components/LoggerDisplay.js
import React, { Component } from 'react';
import { WalletConsumer } from './context/WalletContext';

class LoggerDisplay extends Component {
    render() {
        return (
            <WalletConsumer>
                {({ logs }) => (
                    <div>
                            {
                             logs.map(
                                 (log, index) => {
                                    const opacity = index * 0.4; // Decrease opacity by 0.1 for each log
                                    return (
                                        <div
                                            key={index}
                                            style={{ opacity: Math.max(opacity, 0.1) }} // Ensure minimum opacity of 0.1
                                        >
                                            {log}
                                        </div>
                                    );

                                 }
                                )
                            }
                    </div>
                )}
            </WalletConsumer>
        );
    }
}

export default LoggerDisplay;
