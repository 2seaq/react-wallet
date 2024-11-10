import React, { Component } from 'react';
import { WalletConsumer } from './context/WalletContext';
import Box from '@mui/material/Box';

class LoggerDisplay extends Component {
    render() {
        return (
            <WalletConsumer>
                {({ logs }) => (
                    <Box>
                            {
                             logs.map(
                                 (log, index) => {
                                    const opacity = index * 0.4; // Decrease opacity by 0.1 for each log
                                    return (
                                        <Box
                                            key={index}
                                            style={{ opacity: Math.max(opacity, 0.1) }} // Ensure minimum opacity of 0.1
                                        >
                                            {log}
                                        </Box>
                                    );
                                 }
                                )
                            }
                    </Box>
                )}
            </WalletConsumer>
        );
    }
}

export default LoggerDisplay;
