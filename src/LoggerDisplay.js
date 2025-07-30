import React, { Component } from 'react';
import { WalletConsumer } from './context/WalletContext';
import { Box, Typography } from '@mui/material';

class LoggerDisplay extends Component {
    render() {
        return (
            <WalletConsumer>
                {({ logs }) => (
                    <Box
                        sx={{
                            maxWidth: 480,
                            mx: 'auto',
                            px: 2,
                //            pt: 3,
             //               pb: 4, // Space for bottom nav
    //                        bgcolor: '#898989'

                        }}

                    >
                        {
                            logs.map(
                                (log, index) => {
                                    const opacity = index * 0.4; // Decrease opacity by 0.1 for each log
                                    return (
                                        <Box
                                            key={index}
                                            style={{ opacity: 1.0}}     
       //                                     style={{ opacity: Math.max(opacity, 0.1) }} // Ensure minimum opacity of 0.1
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.8rem', // Very small font size
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
