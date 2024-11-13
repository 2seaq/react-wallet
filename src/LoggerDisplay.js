import React, { Component } from 'react';
import { WalletConsumer } from './context/WalletContext';
import { Box, Typography } from '@mui/material';

class LoggerDisplay extends Component {
    render() {
        return (
            <WalletConsumer>
                {({ logs }) => (
                    <Box >
                            {
                             logs.map(
                                 (log, index) => {
                                    const opacity = index * 0.4; // Decrease opacity by 0.1 for each log
                                    return (
                                        <Box
                                            key={index}
                                            style={{ opacity: Math.max(opacity, 0.1) }} // Ensure minimum opacity of 0.1
                                        >
                  <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.6rem', // Very small font size
                        textAlign: 'left',  // Align text to the left
                      }}
                  >
                    {log}
                  </Typography>
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
