import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WalletConsumer } from '../../context/WalletContext';
import { ButtonGroup, TextField, Divider, Grid } from '@mui/material';
import { VERSION } from '../../conf';

export default class General extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <WalletConsumer>
        {({ address }) => (
          <Box
            display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start">
                					<Grid container>
						<Grid item xs={7}>
							<Typography>Version</Typography>
						</Grid>
						<Grid item xs={5} textAlign="right">
							<Typography>{VERSION}</Typography>
						</Grid>
					</Grid>
          </Box>
        )}
      </WalletConsumer>
    )
  }
}