import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WalletConsumer } from '../../context/WalletContext';
import LoggerDisplay from '../../LoggerDisplay';


export default class General extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
				<Box sx={{ flexShrink: 0 }}>
					<LoggerDisplay />
				</Box>
    )
  }
}